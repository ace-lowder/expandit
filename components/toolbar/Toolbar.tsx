import { useState } from "react";
import CustomScaleSection from "./CustomScaleSection";
import SocialPresetsSection from "./SocialPresetsSection";
import ImageInfo from "./ImageInfo";

const Toolbar: React.FC = () => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const handleBackClick = () => {
    setSelectedPlatform(null);
  };

  return (
    <div className="min-w-80 max-w-80 bg-white p-4 shadow-lg text-black max-h-screen overflow-y-auto">
      <ImageInfo />
      <CustomScaleSection />
      <SocialPresetsSection
        selectedPlatform={selectedPlatform}
        onSelectPlatform={handlePlatformClick}
        onBack={handleBackClick}
      />
    </div>
  );
};

export default Toolbar;
