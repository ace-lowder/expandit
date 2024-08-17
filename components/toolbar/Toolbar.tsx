"use client";

import { useState } from "react";
import {
  ImageInfo,
  ActionPanel,
  CustomScale,
  CommonPresets,
  SocialPresets,
  PresetCategory,
} from "@/components";

interface ToolbarProps {
  isCollapsed: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ isCollapsed }) => {
  const [selectedSocial, setSelectedSocial] = useState<string | null>(null);
  console.log(isCollapsed);

  return (
    <div
      className={`bg-white text-gray-700 flex flex-col justify-between flex-none md:h-auto shadow-lg md:shadow-none overflow-hidden border-t-2 md:border-none
        ${
          isCollapsed
            ? "-translate-y-full md:translate-y-0 md:-translate-x-full h-0 md:h-auto w-full md:w-0"
            : "transition-all duration-300 translate-y-0 md:translate-x-0 h-1/2 md:h-auto w-full md:w-auto"
        }`}
    >
      <div className="flex flex-col overflow-y-auto w-full p-4 gap-6">
        {selectedSocial ? (
          <PresetCategory
            selectedSocial={selectedSocial}
            onBack={() => {
              setSelectedSocial(null);
            }}
          />
        ) : (
          <>
            <ImageInfo />
            <CustomScale />
            <CommonPresets />
            <SocialPresets setSelectedSocial={setSelectedSocial} />
          </>
        )}
      </div>
      <ActionPanel />
    </div>
  );
};

export default Toolbar;
