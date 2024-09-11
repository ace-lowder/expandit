import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { clerkId, credits } = await req.json();

    if (!clerkId || credits === undefined) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    const user: IUser | null = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.credits = credits;
    await user.save();

    return NextResponse.json({ success: true, credits: user.credits });
  } catch (error) {
    console.error("Error updating credits:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
