"use client";

import { useImage } from "@/context/ImageContext";
import ImageUploader from "@/components/common/ImageUploader";
import DownloadButton from "@/components/imageviewer/DownloadButton";

const ImageViewer: React.FC = () => {
  const { image, ratio } = useImage();

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center relative">
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <div className="relative max-w-[50%] w-full flex justify-center items-center">
            <img
              src={typeof image === "string" ? image : ""}
              alt="Uploaded Image"
              className="max-w-full max-h-[50%] h-auto object-contain"
            />
            <div
              className="absolute bg-gray-400 z-10 h-full"
              style={{
                aspectRatio: `${ratio}`,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ImageViewer;
