import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User, { IUser } from "@/models/User";

export async function POST(req: NextRequest) {
  await dbConnect();

  const { clerkId, imagePrefix, quality } = await req.json();

  if (!clerkId || !imagePrefix || !quality) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const user: IUser | null = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const unlockedImage = user.unlockedImages.find(
      (image) => image.prefix === imagePrefix
    );

    if (unlockedImage) {
      if (!unlockedImage.qualities.includes(quality)) {
        unlockedImage.qualities.push(quality);
      }
    } else {
      user.unlockedImages.push({ prefix: imagePrefix, qualities: [quality] });
    }

    await user.save();

    return NextResponse.json({
      success: true,
      unlockedImages: user.unlockedImages,
    });
  } catch (error) {
    console.error("Error unlocking image:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const clerkId = searchParams.get("clerkId");
  const imagePrefix = searchParams.get("imagePrefix");

  if (!clerkId || !imagePrefix) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
    const user: IUser | null = await User.findOne({ clerkId });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const unlockedImage = user.unlockedImages.find(
      (image) => image.prefix === imagePrefix
    );

    const unlockedQualities = unlockedImage ? unlockedImage.qualities : [];

    return NextResponse.json({ success: true, unlockedQualities });
  } catch (error) {
    console.error("Error fetching unlock status:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
