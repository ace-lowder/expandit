"use client";

import { useState } from "react";
import { useImage } from "@/lib";
import {
  Toolbar,
  ImageViewer,
  CollapseButton,
  DownloadButton,
  History,
} from "@/components";

const ExpandPage = () => {
  const [isToolbarCollapsed, setIsToolbarCollapsed] = useState(false);
  const { image } = useImage();

  const toggleToolbar = () => {
    setIsToolbarCollapsed(!isToolbarCollapsed);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-100">
      {/* Toolbar */}
      <Toolbar
        isCollapsed={!image || isToolbarCollapsed}
        className={`flex-none lg:h-auto ${
          isToolbarCollapsed ? "lg:w-20" : "lg:w-80"
        } lg:relative`}
      />

      {/* Main content */}
      <div
        className={`flex-grow h-full flex justify-center items-center relative`}
      >
        {image && (
          <CollapseButton
            isCollapsed={isToolbarCollapsed}
            collapseToolbar={toggleToolbar}
          />
        )}
        <DownloadButton />
        <History />
        <ImageViewer />
      </div>
    </div>
  );
};

export default ExpandPage;
