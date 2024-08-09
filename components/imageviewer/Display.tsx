"use client";

import { useRef, useEffect, useState } from "react";
import { useImage } from "@/lib";

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
    isGenerating,
  } = useImage();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [startAnimation, setStartAnimation] = useState(false);

  const updateScaleFactor = () => {
    if (viewerRef.current) {
      const viewerWidth = viewerRef.current.clientWidth;
      const viewerHeight = viewerRef.current.clientHeight;

      const scaleWidth = (viewerWidth - 100) / fillWidth;
      const scaleHeight = (viewerHeight - 100) / fillHeight;
      setScaleFactor(Math.min(scaleWidth, scaleHeight));
    }
  };

  useEffect(() => {
    updateScaleFactor();
    window.addEventListener("resize", updateScaleFactor);
    const observer = new ResizeObserver(updateScaleFactor);
    if (viewerRef.current) {
      observer.observe(viewerRef.current);
    }

    return () => {
      window.removeEventListener("resize", updateScaleFactor);
      if (viewerRef.current) {
        observer.unobserve(viewerRef.current);
      }
    };
  }, [fillWidth, fillHeight]);

  useEffect(() => {
    if (fillWidth < width) {
      const scale = width / fillWidth;
      setFillWidth(Math.ceil(width));
      setFillHeight(Math.ceil(fillHeight * scale));
    }
    if (fillHeight < height) {
      const scale = height / fillHeight;
      setFillHeight(Math.ceil(height));
      setFillWidth(Math.ceil(fillWidth * scale));
    }
  }, [fillWidth, fillHeight, width, height, setFillWidth, setFillHeight]);

  useEffect(() => {
    if (generatedImage) {
      setStartAnimation(true);
    }
  }, [generatedImage]);

  return (
    <div
      ref={viewerRef}
      className="w-full h-full flex justify-center items-center relative"
    >
      <div
        className="absolute checkerboard"
        style={{
          width: `${fillWidth * scaleFactor}px`,
          height: `${fillHeight * scaleFactor}px`,
        }}
      />
      {(isGenerating || generatedImage) && (
        <div
          className={`absolute ${isGenerating ? "fade-in" : "fade-out"}`}
          style={{
            width: `${fillWidth * scaleFactor}px`,
            height: `${fillHeight * scaleFactor}px`,
          }}
        >
          <div className="shimmer"></div>
        </div>
      )}
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated Image"
          className={`absolute pointer-events-none ${
            startAnimation ? "wipe-in" : ""
          }`}
          style={{
            width: `${fillWidth * scaleFactor}px`,
            height: `${fillHeight * scaleFactor}px`,
          }}
        />
      )}
      <img
        src={typeof image === "string" ? image : ""}
        alt="Uploaded Image"
        className={`z-10 ${startAnimation ? "fade-out-delay" : ""}`}
        style={{
          width: `${width * scaleFactor}px`,
          height: `${height * scaleFactor}px`,
        }}
      />
    </div>
  );
};

export default Display;
