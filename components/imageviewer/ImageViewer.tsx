"use client";

import { useImage } from "@/context/ImageContext";

import ImageUploader from "../common/ImageUploader";
import DownloadButton from "./DownloadButton";
import Display from "./Display";

const ImageViewer: React.FC = () => {
  const { image } = useImage();

  return <>{!image ? <ImageUploader /> : <Display />}</>;
};

export default ImageViewer;
