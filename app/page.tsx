"use client";

import { useState } from "react";
import { useImage } from "@/lib/contexts/ImageContext";
import Toolbar from "@/components/toolbar/Toolbar";
import ImageViewer from "@/components/imageviewer/ImageViewer";
import CollapseButton from "@/components/toolbar/CollapseButton";
import DownloadButton from "@/components/imageviewer/DownloadButton";
import History from "@/components/imageviewer/History";

export default function Home() {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const { image } = useImage();

  const toggleToolbar = () => {
    setIsToolbarCollapsed(!isToolbarCollapsed);
  };

  return (
    <div
      className={`flex flex-col-reverse md:flex-row h-[calc(100vh-66px)] w-full bg-gray-100 overflow-hidden overflow-y-hidden`}
    >
      <Toolbar isCollapsed={!image || isToolbarCollapsed} />

      <div className={`flex-grow flex justify-center items-center relative`}>
        {image && (
          <CollapseButton
            isCollapsed={isToolbarCollapsed}
            collapseToolbar={toggleToolbar}
          />
        )}
        <ImageViewer />
        <DownloadButton />
        <History />
      </div>
    </div>
  );
}
