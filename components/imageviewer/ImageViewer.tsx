"use client";

import { useRef, useEffect } from "react";
import { useImage } from "@/context/ImageContext";
import ImageUploader from "@/components/common/ImageUploader";
import DownloadButton from "@/components/imageviewer/DownloadButton";

const ImageViewer: React.FC = () => {
  const { image, width, height } = useImage();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const drawImageOnCanvas = () => {
      if (canvasRef.current && image) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          const img = new Image();
          img.src = image as string;
          img.onload = () => {
            // Set canvas dimensions to 2x image dimensions
            const canvasWidth = img.width * 2;
            const canvasHeight = img.height * 2;
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;

            // Clear the canvas
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Calculate the position to center the image
            const x = (canvasWidth - img.width) / 2;
            const y = (canvasHeight - img.height) / 2;

            // Draw image on canvas
            ctx.drawImage(img, x, y, img.width, img.height);

            // Calculate scale to fit within 50% of the viewer width
            const viewerWidth = canvas.parentElement?.clientWidth || 1;
            const scale = (viewerWidth * 0.5) / canvasWidth;

            // Scale the canvas down
            canvas.style.width = `${canvasWidth * scale}px`;
            canvas.style.height = `${canvasHeight * scale}px`;
          };
        }
      }
    };

    drawImageOnCanvas();
    window.addEventListener("resize", drawImageOnCanvas);

    return () => {
      window.removeEventListener("resize", drawImageOnCanvas);
    };
  }, [image, width, height]);

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center relative">
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <canvas ref={canvasRef} className="w-full h-auto" />
        </>
      )}
    </div>
  );
};

export default ImageViewer;
