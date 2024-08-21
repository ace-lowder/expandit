import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import { User, IUser } from "@/models";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { clerkId, newPlan } = await req.json();

    if (!clerkId || !newPlan) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const user: IUser | null = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.plan = newPlan.toLowerCase();
    await user.save();

    return NextResponse.json({ success: true, plan: user.plan });
  } catch (error) {
    console.error("Error changing plan:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
