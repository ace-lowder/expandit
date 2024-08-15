import { NextApiRequest, NextApiResponse } from "next";
import { default as cloudinary } from "@/lib/cloudinary";

export default async function generativeFill(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageUrl, dimensions } = req.body;

    try {
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

      res.status(200).json({ url: transformationUrl });
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      res.status(500).json({ error: "Failed to perform generative fill" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
