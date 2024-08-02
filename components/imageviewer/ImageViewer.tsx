"use client";

import { useRef, useEffect, useState } from "react";
import { useImage } from "@/context/ImageContext";
import ImageUploader from "@/components/common/ImageUploader";
import DownloadButton from "@/components/imageviewer/DownloadButton";

const ImageViewer: React.FC = () => {
  const {
    image,
    width,
    height,
    fillWidth,
    fillHeight,
    setFillWidth,
    setFillHeight,
    generatedImage,
    setGeneratedImage,
  } = useImage();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const updateScaleFactor = () => {
      if (viewerRef.current) {
        const viewerWidth = viewerRef.current.clientWidth;
        const viewerHeight = viewerRef.current.clientHeight;

        const scaleWidth = (viewerWidth - 100) / fillWidth;
        const scaleHeight = (viewerHeight - 100) / fillHeight;
        setScaleFactor(Math.min(scaleWidth, scaleHeight));
      }
    };

    updateScaleFactor();
    window.addEventListener("resize", updateScaleFactor);

    return () => {
      window.removeEventListener("resize", updateScaleFactor);
    };
  }, [fillWidth, fillHeight]);

  useEffect(() => {
    if (fillWidth < width) {
      const scale = width / fillWidth;
      setFillWidth(width);
      setFillHeight(fillHeight * scale);
    }
    if (fillHeight < height) {
      const scale = height / fillHeight;
      setFillHeight(height);
      setFillWidth(fillWidth * scale);
    }
  }, [fillWidth, fillHeight, width, height, setFillWidth, setFillHeight]);

  const handleGenerativeFill = async () => {
    try {
      const response = await fetch("/api/generativeFill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: image,
          dimensions: {
            width: Math.round(fillWidth),
            height: Math.round(fillHeight),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.url);
      } else {
        const errorData = await response.json();
        console.error("Generative fill error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  return (
    <div
      ref={viewerRef}
      className="w-full h-full bg-gray-100 flex justify-center items-center relative"
    >
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <button
            onClick={handleGenerativeFill}
            className="absolute top-4 z-20 bg-blue-500 text-white p-2 rounded"
          >
            Generate Fill
          </button>
          <img
            src={generatedImage || ""}
            alt="Generated Image"
            className="absolute bg-gray-400"
            style={{
              width: `${fillWidth * scaleFactor}px`,
              height: `${fillHeight * scaleFactor}px`,
              backgroundRepeat: "repeat",
              backgroundSize: "contain",
            }}
          />
          {!generatedImage && (
            <img
              src={typeof image === "string" ? image : ""}
              alt="Uploaded Image"
              className="z-10"
              style={{
                width: `${width * scaleFactor}px`,
                height: `${height * scaleFactor}px`,
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ImageViewer;
