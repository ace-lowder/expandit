"use client";

import { useState } from "react";
import {
  Toolbar,
  ImageViewer,
  CollapseButton,
  DownloadButton,
} from "@/components";

const ExpandPage = () => {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);

  const toggleToolbar = () => {
    setIsToolbarCollapsed(!isToolbarCollapsed);
  };

  return (
    <div className="flex h-[calc(100vh-65px)] bg-gray-100">
      <Toolbar isCollapsed={isToolbarCollapsed} />
      <div
        className={`w-full h-full flex justify-center items-center relative transition-all ${
          isToolbarCollapsed ? "ml-0" : "ml-80"
        }`}
      >
        <CollapseButton
          isCollapsed={isToolbarCollapsed}
          collapseToolbar={toggleToolbar}
        />
        <DownloadButton />
        <ImageViewer />
      </div>
    </div>
  );
};

export default ExpandPage;
