"use client";

import { useRef, useEffect, useState } from "react";
import { useImage } from "@/context/ImageContext";

const Display: React.FC = () => {
  const {
    image,
    width,
    height,
    fillWidth,
    fillHeight,
    setFillWidth,
    setFillHeight,
    generatedImage,
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

  return (
    <div
      ref={viewerRef}
      className="w-full h-full bg-gray-100 flex justify-center items-center relative"
    >
      <img
        src={generatedImage || ""}
        alt="Generated Image"
        className="absolute checkerboard"
        style={{
          width: `${fillWidth * scaleFactor}px`,
          height: `${fillHeight * scaleFactor}px`,
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
    </div>
  );
};

export default Display;
