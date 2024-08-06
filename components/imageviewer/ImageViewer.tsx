"use client";

import { useImage } from "@/context/ImageContext";

import ImageUploader from "../common/ImageUploader";
import DownloadButton from "./DownloadButton";
import Display from "./Display";

const ImageViewer: React.FC = () => {
  const { image } = useImage();

  return (
    <div className="w-full h-full bg-gray-100 flex justify-center items-center relative">
      {!image ? (
        <ImageUploader />
      ) : (
        <>
          <DownloadButton />
          <Display />
        </>
      )}
    </div>
  );
};

export default ImageViewer;
