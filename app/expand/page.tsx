"use client";

import Toolbar from "@/components/Toolbar";
import ImageViewer from "@/components/ImageViewer";
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
