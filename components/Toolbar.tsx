import { useState } from "react";
import { useImage } from "@/context/ImageContext";
import { presetList } from "@/constants/presets";
import { FaArrowLeft } from "react-icons/fa";
import SquareButton from "./SquareButton";

const Toolbar: React.FC = () => {
  const { width, height } = useImage();
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);

  const handlePlatformClick = (platform: string) => {
    setSelectedPlatform(platform);
  };

  const selectedSocialMedia = presetList.find(
    (social) => social.name === selectedPlatform
  );

  return (
    <div className="min-w-80 max-w-80 bg-white p-4 shadow-lg text-black">
      {!selectedPlatform ? (
        <>
          <div className="flex flex-col items-start w-full mb-6">
            <h2 className="text-xl font-bold text-center mb-2 ">
              Custom Scale
            </h2>
            <span>
              {width}x{height}
            </span>
          </div>
          <div className="flex flex-col items-start w-full">
            <h2 className="text-xl font-bold text-center mb-6 ">
              Choose a Preset Size
            </h2>
            <div className="grid grid-cols-3 gap-4 justify-items-stretch w-full">
              {presetList.map((social) => (
                <div
                  key={social.name}
                  className="flex flex-col gap-2 items-center"
                >
                  <SquareButton
                    key={social.name}
                    icon={<social.icon className="w-7 h-7" />}
                    onClick={() => handlePlatformClick(social.name)}
                    className="flex flex-col items-center"
                  />
                  <span className="text-xs">{social.name}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-start gap-4">
          <button
            onClick={() => setSelectedPlatform(null)}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 flex items-center mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="ml-2">Back</span>
          </button>
          {selectedSocialMedia?.categories.map((category) => (
            <div key={category.category} className="w-full">
              <h2 className="text-lg font-bold mb-2">{category.category}</h2>
              <div className="flex flex-col gap-2">
                {category.presets.map((preset) => (
                  <button
                    key={preset.label}
                    className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl"
                  >
                    <span>{preset.label}</span>
                    <span className="text-sm">{preset.size}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toolbar;
