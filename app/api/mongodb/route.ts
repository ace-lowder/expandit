import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { clerkId } = body;

    if (!clerkId) {
      return NextResponse.json({ error: "Missing clerkId" }, { status: 400 });
    }

    await dbConnect();

    let existingUser = await User.findOne({ clerkId }).lean<IUser>();

    if (!existingUser) {
      const newUser = await User.create({
        clerkId,
        credits: 0,
        plan: "free",
      });
      existingUser = newUser.toObject() as IUser;
    }

    return NextResponse.json({ success: true, user: existingUser });
  } catch (error) {
    console.error("Error syncing user with MongoDB:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
