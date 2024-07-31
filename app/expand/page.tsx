"use client";

import Toolbar from "@/components/toolbar/Toolbar";
import ImageViewer from "@/components/imageviewer/ImageViewer";
import { useImage } from "@/context/ImageContext";

const ExpandPage = () => {
  const { image } = useImage();

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <Toolbar />
      <ImageViewer />
    </div>
  );
};

export default ExpandPage;
