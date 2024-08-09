import { NextApiRequest, NextApiResponse } from "next";
import { default as cloudinary } from "@/lib/cloudinary";

export default async function generativeFill(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { imageUrl, dimensions } = req.body;

    try {
      // Upload the image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(imageUrl);

      // Get the public ID of the uploaded image
      const publicId = uploadResponse.public_id;

      // Apply the generative fill transformation
      const transformationUrl = cloudinary.url(publicId, {
        transformation: [
          {
            width: dimensions.width,
            height: dimensions.height,
            crop: "pad",
            background: "gen_fill",
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
