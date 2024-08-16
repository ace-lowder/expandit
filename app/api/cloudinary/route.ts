import { NextRequest, NextResponse } from "next/server";
import { default as cloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const { imageUrl, dimensions } = await req.json();

    const uploadResponse = await cloudinary.uploader.upload(imageUrl);
    const publicId = uploadResponse.public_id;

    const transformationUrl = cloudinary.url(publicId, {
      transformation: [
        {
          width: dimensions.width,
          height: dimensions.height,
          crop: "mpad",
          background: `gen_fill:seed_${Date.now()}`,
        },
      ],
    });

    return NextResponse.json({ url: transformationUrl });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return new NextResponse("Failed to perform generative fill", {
      status: 500,
    });
  }
}
