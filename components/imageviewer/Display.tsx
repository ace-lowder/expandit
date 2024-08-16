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
    if (fillWidth <= 0 || fillHeight <= 0 || width <= 0 || height <= 0) return;

    const originalAspectRatio = width / height;
    const fillAspectRatio = fillWidth / fillHeight;

    let targetWidth = fillWidth;
    let targetHeight = fillHeight;

    // Only scale down if both fillWidth and fillHeight are less than or equal to the original dimensions
    if (fillWidth <= width || fillHeight <= height) {
      if (fillAspectRatio > originalAspectRatio) {
        // Adjust based on height to maintain aspect ratio without reducing width
        targetHeight = height;
        targetWidth = Math.floor(height * fillAspectRatio);

        // Ensure the width does not reduce below the original width
        if (targetWidth < width) {
          targetWidth = width;
          targetHeight = Math.floor(width / fillAspectRatio);
        }
      } else {
        // Adjust based on width to maintain aspect ratio without reducing height
        targetWidth = width;
        targetHeight = Math.floor(width / fillAspectRatio);

        // Ensure the height does not reduce below the original height
        if (targetHeight < height) {
          targetHeight = height;
          targetWidth = Math.floor(height * fillAspectRatio);
        }
      }
    }

    // Set the calculated size only if it doesn't scale down unnecessarily
    if (targetWidth >= fillWidth && targetHeight >= fillHeight) {
      setFillSize(targetWidth, targetHeight);
    }
  }, [fillWidth, fillHeight, width, height]);

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
