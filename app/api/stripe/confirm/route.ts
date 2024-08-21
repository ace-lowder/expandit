import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    console.log("Missing session_id");
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    await dbConnect();
    console.log("Connected to MongoDB");

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("Session retrieved:", session);

    if (!session) {
      console.log("Invalid session");
      return NextResponse.json({ error: "Invalid session" }, { status: 404 });
    }

    // Check if customer_email is null and try to retrieve the customer
    if (!session.customer_email && session.customer) {
      console.log(
        "Customer email is null, trying to retrieve customer object..."
      );
      const customer = await stripe.customers.retrieve(
        session.customer as string
      );
      console.log("Customer retrieved:", customer);

      if ((customer as Stripe.Customer).email) {
        const customerEmail = (customer as Stripe.Customer).email;
        console.log("Customer email:", customerEmail);
      } else {
        console.log("Customer email still not found");
        return NextResponse.json(
          { error: "Customer email not found" },
          { status: 404 }
        );
      }
    } else if (session.customer_email) {
      console.log("Customer email found in session:", session.customer_email);
    } else {
      console.log("No customer email and no customer ID available");
      return NextResponse.json(
        { error: "Customer email not found" },
        { status: 404 }
      );
    }

    // Assuming you have the email now, proceed to find the user and update the plan
    const customerEmail = session.customer_email;
    const user = await User.findOne({ email: customerEmail });

    if (!user) {
      console.log("User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let newPlan: string | undefined;

    if (typeof session.subscription === "string") {
      // If session.subscription is a string (ID), retrieve the subscription
      const subscription = await stripe.subscriptions.retrieve(
        session.subscription
      );
      const priceId = subscription.items.data[0].price.id;

      if (priceId === "price_1PqJHhEL4JOyeCUh7WULVHy7") newPlan = "silver";
      if (priceId === "price_1PqJJCEL4JOyeCUhL2KGcfSd") newPlan = "gold";
    } else if (
      session.subscription &&
      typeof session.subscription === "object"
    ) {
      // If session.subscription is already a Subscription object
      const priceId = session.subscription.items.data[0].price.id;

      if (priceId === "price_1PqJHhEL4JOyeCUh7WULVHy7") newPlan = "silver";
      if (priceId === "price_1PqJJCEL4JOyeCUhL2KGcfSd") newPlan = "gold";
    }

    if (newPlan) {
      user.plan = newPlan;
      await user.save();
      console.log("User plan updated to:", newPlan);
    } else {
      console.log("Plan not found for the session");
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error confirming payment:", error);
    return NextResponse.json(
      { error: "Failed to confirm payment" },
      { status: 500 }
    );
  }
}
