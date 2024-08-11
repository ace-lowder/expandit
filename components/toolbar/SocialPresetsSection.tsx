import { FaArrowLeft } from "react-icons/fa";
import { presetList } from "@/lib";
import { SquareButton, PresetButton, Header } from "@/components";

interface SocialPresetsProps {
  selectedPlatform: string | null;
  onSelectPlatform: (platform: string) => void;
  onBack: () => void;
}

const SocialPresetsSection: React.FC<SocialPresetsProps> = ({
  selectedPlatform,
  onSelectPlatform,
  onBack,
}) => {
  const selectedSocial = presetList.find(
    (social) => social.name === selectedPlatform
  );

  let maxWidth = 0;
  let maxHeight = 0;

  selectedSocial?.categories.forEach((category) =>
    category.presets.forEach((preset) => {
      const [width, height] = preset.size.split("x").map(Number);
      if (width > maxWidth) maxWidth = width;
      if (height > maxHeight) maxHeight = height;
    })
  );

  return (
    <div className="flex flex-col items-start w-full">
      {!selectedPlatform ? (
        <>
          <Header>Choose a Preset Size</Header>
          <div className="grid grid-cols-3 gap-4 justify-items-stretch w-full">
            {presetList.map((social) => (
              <div
                key={social.name}
                className="flex flex-col gap-2 items-center"
              >
                <SquareButton
                  icon={<social.icon className="w-7 h-7" />}
                  onClick={() => onSelectPlatform(social.name)}
                  color={social.color}
                />
                <span className="text-xs">{social.name}</span>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <button
            onClick={onBack}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 flex items-center mb-6"
          >
            <FaArrowLeft className="w-4 h-4" />
            <span className="ml-2">Back</span>
          </button>
          {selectedSocial?.categories.map((category) => (
            <div key={category.category} className="w-full">
              <Header>{category.category}</Header>
              <div className="flex flex-col gap-2">
                {category.presets.map((preset) => (
                  <PresetButton
                    key={preset.label}
                    label={preset.label}
                    size={preset.size}
                    maxWidth={maxWidth}
                    maxHeight={maxHeight}
                  />
                ))}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default SocialPresetsSection;
