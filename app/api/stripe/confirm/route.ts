import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Function to extract the session ID from the query parameters
function extractSessionId(req: NextRequest): string | null {
  const { searchParams } = new URL(req.url);
  return searchParams.get("session_id");
}

// Function to fetch the Stripe session
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

// Function to verify the user from Clerk
async function verifyUserFromClerk(req: NextRequest) {
  const auth = getAuth(req);
  const clerkId = auth.userId;

  if (!clerkId) {
    console.error("Clerk user not authenticated");
    return null;
  }

  // Connect to MongoDB
  await dbConnect();

  // Find user in MongoDB
  try {
    const user = await User.findOne({ clerkId });
    if (!user) {
      console.error("User not found in MongoDB");
      return null;
    }

    console.log("User verified from Clerk:", user);
    return user;
  } catch (error) {
    console.error("Error finding user in MongoDB:", error);
    return null;
  }
}

// Function to update the user's subscription in MongoDB
async function updateUserSubscription(
  user: any,
  session: Stripe.Checkout.Session
) {
  try {
    // Determine the plan based on the product ID
    const productId = session.line_items?.data[0].price?.product as string;

    if (productId === "prod_QhikHKcMbNua3h") {
      user.plan = "gold";
    } else if (productId === "prod_Qhij4t6d7uaw32") {
      user.plan = "silver";
    } else if (productId === "prod_QhipUWWg9kROqN") {
      user.plan = "gold";
    }

    user.stripeCustomerId = session.customer;
    user.subscriptionId = session.subscription;

    // Update the payment history with required fields
    user.paymentHistory.push({
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      created: session.created,
      invoiceId: session.invoice,
      paymentMethod: session.payment_method_types[0], // Assuming first payment method
      paymentDate: new Date(session.created * 1000), // Convert UNIX timestamp to Date
    });

    await user.save({ validateBeforeSave: true });

    console.log("User subscription updated:", user);
    return true;
  } catch (error) {
    console.error("Failed to update user subscription:", error);
    return false;
  }
}

// Main handler function that processes the payment confirmation
export async function GET(req: NextRequest) {
  try {
    // Step 1: Extract the session ID
    const sessionId = extractSessionId(req);
    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Step 2: Fetch the Stripe session
    const session = await fetchStripeSession(sessionId);
    if (!session) {
      return NextResponse.json(
        { error: "Failed to retrieve Stripe session" },
        { status: 500 }
      );
    }

    // Step 3: Verify the user from Clerk
    const user = await verifyUserFromClerk(req);
    if (!user) {
      return NextResponse.json(
        { error: "User not authenticated or not found" },
        { status: 401 }
      );
    }

    // Step 4: Update the user's subscription in MongoDB
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
