import { useState } from "react";
import { useImage } from "@/context/ImageContext";
import CustomScaleSection from "./CustomScaleSection";
import SocialPresetsSection from "./SocialPresetsSection";
import ImageInfo from "./ImageInfo";
import GenerateButton from "./GenerateButton";
import ResetButton from "./ResetButton";

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
      className={`absolute left-0 flex w-[320px] h-[calc(100vh-65px)] overflow-visible z-50 transition-all ${
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
