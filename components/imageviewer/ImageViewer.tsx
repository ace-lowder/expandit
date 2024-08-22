"use client";

import { useRef, useEffect, useState } from "react";
import { useImage } from "@/lib";
import { ImageUploader } from "@/components";

const ImageViewer: React.FC = () => {
  const {
    image,
    width,
    height,
    fillWidth,
    fillHeight,
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
  }, [width, height, fillWidth, fillHeight]);

  return (
    <>
      {!image ? (
        <ImageUploader className="w-1/2" />
      ) : (
        <div
          ref={viewerRef}
          className="w-full h-full flex justify-center items-center relative"
        >
          {/* Shimmer Effect */}
          {(isGenerating || generatedImage) && (
            <div
              className={`absolute z-10 ${
                isGenerating ? "fade-in" : "fade-out"
              }`}
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
            className={`z-20 transition-all ${
              generatedImage ? "fade-out-delay" : ""
            }`}
            style={{
              width: `${width * scaleFactor}px`,
              height: `${height * scaleFactor}px`,
            }}
          />
        </div>
      )}
    </>
  );
};

export default ImageViewer;
