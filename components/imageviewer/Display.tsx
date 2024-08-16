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
    setFillSize,
    generatedImage,
    isGenerating,
    overrideResize,
  } = useImage();
  const viewerRef = useRef<HTMLDivElement>(null);
  const [scaleFactor, setScaleFactor] = useState(1);

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
    if (!overrideResize) {
      if (fillWidth <= 0 || fillHeight <= 0) return;

      const fillAspectRatio = fillWidth / fillHeight;

      let targetWidth, targetHeight;

      if (fillAspectRatio === 1) {
        // Special case for 1x1 aspect ratio: Choose the smaller dimension
        if (width < height) {
          targetWidth = height;
          targetHeight = height; // Make it square
        } else {
          targetHeight = width;
          targetWidth = width; // Make it square
        }
      } else if (fillWidth < fillHeight) {
        // Width should be the limiting factor
        targetWidth = width;
        targetHeight = Math.ceil(width / fillAspectRatio);
      } else {
        // Height should be the limiting factor
        targetHeight = height;
        targetWidth = Math.ceil(height * fillAspectRatio);
      }

      // Set the fill size based on the calculated dimensions
      setFillSize(targetWidth, targetHeight, true);
    }
  }, [fillWidth, fillHeight, width, height, overrideResize]);

  return (
    <div
      ref={viewerRef}
      className="w-full h-full flex justify-center items-center relative"
    >
      {/* Shimmer Effect*/}
      {(isGenerating || generatedImage) && (
        <div
          className={`absolute z-10 ${isGenerating ? "fade-in" : "fade-out"}`}
          style={{
            width: `${fillWidth * scaleFactor}px`,
            height: `${fillHeight * scaleFactor}px`,
          }}
        >
          <div className="shimmer" />
        </div>
      )}

      {/* Fill View */}
      <div
        className="absolute checkerboard transition-all"
        style={{
          width: `${fillWidth * scaleFactor}px`,
          height: `${fillHeight * scaleFactor}px`,
        }}
      >
        <span className="absolute -bottom-6 right-0 text-gray-700 text-sm">{`[${fillWidth}x${fillHeight}]`}</span>
      </div>

      {/* Generated Image */}
      {generatedImage && (
        <img
          src={generatedImage}
          alt="Generated Image"
          className="absolute pointer-events-none wipe-in"
          style={{
            width: `${fillWidth * scaleFactor}px`,
            height: `${fillHeight * scaleFactor}px`,
          }}
        />
      )}

      {/* Original Image */}
      <img
        src={typeof image === "string" ? image : ""}
        alt="Uploaded Image"
        className={`z-30 transition-all ${
          generatedImage ? "fade-out-delay" : ""
        }`}
        style={{
          width: `${width * scaleFactor}px`,
          height: `${height * scaleFactor}px`,
        }}
      />
    </div>
  );
};

export default Display;
