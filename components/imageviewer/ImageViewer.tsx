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
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <img
            src={typeof image === "string" ? image : ""}
            alt="Uploaded Image"
            className="z-10"
            style={{
              width: `${width * scaleFactor}px`,
              height: `${height * scaleFactor}px`,
            }}
          />
          <img
            alt="Generated Image"
            className="absolute bg-gray-400"
            style={{
              width: `${fillWidth * scaleFactor}px`,
              height: `${fillHeight * scaleFactor}px`,
              backgroundImage:
                "url('https://as1.ftcdn.net/v2/jpg/01/99/11/80/1000_F_199118049_QJ8e3sYdcuXJfODcA5YjJqKOyypKAKuR.jpg')",
              backgroundRepeat: "repeat",
              backgroundSize: "contain",
            }}
          />
        </>
      )}
    </div>
  );
};

export default ImageViewer;
