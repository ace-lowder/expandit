import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId, cost } = body;

    if (!clerkId || typeof cost !== "number") {
      return NextResponse.json(
        { error: "Missing or invalid parameters" },
        { status: 400 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ clerkId });

    if (!user || user.credits < cost) {
      return NextResponse.json(
        { error: "Insufficient credits" },
        { status: 400 }
      );
    }

    user.credits -= cost;
    await user.save();

    return NextResponse.json({ success: true, credits: user.credits });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
