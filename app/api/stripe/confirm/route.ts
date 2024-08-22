import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

function extractSessionId(req: NextRequest): string | null {
  const { searchParams } = new URL(req.url);
  return searchParams.get("session_id");
}

async function fetchStripeSession(sessionId: string) {
  try {
    return await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });
  } catch (error) {
    console.error("Failed to fetch Stripe session:", error);
    return null;
  }
}

async function verifyUserFromClerk(req: NextRequest) {
  const auth = getAuth(req);
  const clerkId = auth.userId;

  if (!clerkId) {
    console.error("Clerk user not authenticated");
    return null;
  }

  await dbConnect();

  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.error("User not found in MongoDB");
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error finding user in MongoDB:", error);
    return null;
  }
}

async function updateUserSubscription(
  user: any,
  session: Stripe.Checkout.Session
) {
  try {
    const productId = session.line_items?.data[0].price?.product as string;

    if (productId === "prod_QhikHKcMbNua3h") {
      user.plan = "gold";
      user.credits = -1;
    } else if (productId === "prod_Qhij4t6d7uaw32") {
      user.plan = "silver";
      user.credits = 100;
    } else if (productId === "prod_QhipUWWg9kROqN") {
      user.plan = "gold";
      user.credits = -1;
    }

    user.stripeCustomerId = session.customer;
    user.subscriptionId = session.subscription;

    user.paymentHistory.push({
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      created: session.created,
      invoiceId: session.invoice,
      paymentMethod: session.payment_method_types[0],
      paymentDate: new Date(session.created * 1000),
    });

    await user.save({ validateBeforeSave: true });

    console.log("User subscription updated:", user);
    return true;
  } catch (error) {
    console.error("Failed to update user subscription:", error);
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const sessionId = extractSessionId(req);
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    const session = await fetchStripeSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Failed to retrieve Stripe session" },
        { status: 500 }
      );
    }

    const user = await verifyUserFromClerk(req);
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated or not found" },
        { status: 401 }
      );
    }

    const updateSuccess = await updateUserSubscription(user, session);
    if (!updateSuccess) {
      return NextResponse.json(
        { error: "Failed to update user subscription" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Payment confirmed and user updated successfully",
    });
  } catch (error) {
    console.error("Error in payment confirmation:", error);
    return NextResponse.json(
      { error: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
