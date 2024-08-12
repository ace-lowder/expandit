"use client";

import { useState } from "react";
import { useImage } from "@/lib";
import {
  Toolbar,
  ImageViewer,
  CollapseButton,
  DownloadButton,
} from "@/components";

const ExpandPage = () => {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const { image } = useImage();

  const toggleToolbar = () => {
    setIsToolbarCollapsed(!isToolbarCollapsed);
  };

  return (
    <div className="flex h-[calc(100vh-67px)] min-w-[490px] bg-gray-100">
      <Toolbar isCollapsed={!image || isToolbarCollapsed} />
      <div
        className={`w-full h-full flex justify-center items-center relative transition-all ${
          !image || isToolbarCollapsed ? "ml-0" : "ml-80"
        }`}
      >
        {image && (
          <CollapseButton
            isCollapsed={isToolbarCollapsed}
            collapseToolbar={toggleToolbar}
          />
        )}
        <DownloadButton />
        <ImageViewer />
      </div>
    </div>
  );
};

export default ExpandPage;
