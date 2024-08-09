"use client";

import { useImage } from "@/lib";
import { ImageUploader, Display } from "@/components";

const ImageViewer: React.FC = () => {
  const { image } = useImage();

  return <>{!image ? <ImageUploader /> : <Display />}</>;
};

export default ImageViewer;
