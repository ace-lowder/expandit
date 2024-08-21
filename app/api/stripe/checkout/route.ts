import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(req: NextRequest) {
  try {
    const { planType } = await req.json(); // Receive the plan type from the request body

    // Map the planType to the corresponding Stripe price ID
    const priceIdMap: Record<string, string> = {
      silver: "price_1PqJHhEL4JOyeCUh7WULVHy7",
      gold: "price_1PqJJCEL4JOyeCUhL2KGcfSd",
      gold_upgrade: "price_1PqJOGEL4JOyeCUh0oHjn2L6",
    };

    const priceId = priceIdMap[planType];

    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
    }

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: planType === "gold_upgrade" ? "payment" : "subscription",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      customer_email: req.headers.get("email") || undefined,
    });

    console.log(`Created session for plan: ${planType}`);

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create Stripe Checkout session" },
      { status: 500 }
    );
  }
}
