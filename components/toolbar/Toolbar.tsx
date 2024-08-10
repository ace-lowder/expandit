"use client";

import { useState } from "react";
import { useImage } from "@/lib";
import {
  CustomScaleSection,
  SocialPresetsSection,
  ImageInfo,
  GenerateButton,
  ResetButton,
} from "@/components";

interface ToolbarProps {
  isCollapsed: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({ isCollapsed }) => {
  const { image } = useImage();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleBackClick = () => {
    setSelectedPlatform(null);
  };

  return (
    <div
      className={`absolute left-0 flex w-[320px] h-[calc(100vh-65px)] overflow-visible z-30 transition-all ${
        isCollapsed ? "-translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="bg-white p-4 shadow-lg text-black max-h-screen overflow-y-auto w-full">
        {image && (
          <>
            <ImageInfo />
            <div className="flex flex-col gap-2">
              <GenerateButton />
              <ResetButton />
            </div>
          </>
        )}
        <CustomScaleSection />
        <SocialPresetsSection
          selectedPlatform={selectedPlatform}
          onSelectPlatform={handlePlatformClick}
          onBack={handleBackClick}
        />
      </div>
    </div>
  );
};

export default Toolbar;
