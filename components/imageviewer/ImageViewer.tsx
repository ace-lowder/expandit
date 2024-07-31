"use client";

import { useImage } from "@/context/ImageContext";
import ImageUploader from "@/components/common/ImageUploader";
import DownloadButton from "@/components/imageviewer/DownloadButton";

const ImageViewer: React.FC = () => {
  const { image, width, height } = useImage();

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center relative">
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <div className="max-w-[50%] flex flex-col items-end">
            <img
              src={typeof image === "string" ? image : ""}
              alt="Uploaded Image"
              className="max-w-full max-h-[50%] h-auto object-contain"
            />
            <span className="text-gray-700 mt-2">
              {width}x{height}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageViewer;
