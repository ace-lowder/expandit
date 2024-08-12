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

  return (
    <div
      className={`flex flex-col justify-between bg-white text-gray-700 
        absolute left-0 w-[320px] h-[calc(100vh-67px)] overflow-visible z-30
        transition-all ${isCollapsed ? "-translate-x-full" : "translate-x-0"}`}
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
            {/*
          <SocialPresetsSection
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformClick}
          onBack={handleBackClick}
          /> */}
          </>
        )}
      </div>

      <ActionPanel />
    </div>
  );
};

export default Toolbar;
