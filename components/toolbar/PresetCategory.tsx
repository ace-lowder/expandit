import { useImage } from "@/lib";
import { Button, Header, PresetButton } from "@/components";
import { presets } from "@/lib";
import { FaArrowLeft, FaRedo } from "react-icons/fa";

interface PresetCategoryProps {
  selectedSocial: string | null;
  onBack: () => void;
}

const PresetCategory: React.FC<PresetCategoryProps> = ({
  selectedSocial,
  onBack,
}) => {
  const { width, height, fillWidth, fillHeight, setFillSize, generatedImage } =
    useImage();
  const selected = presets.find((social) => social.name === selectedSocial);

  let maxWidth = 0;
  let maxHeight = 0;

  selected?.categories.forEach((category) =>
    category.presets.forEach((preset) => {
      const [width, height] = preset.size.split("x").map(Number);
      if (width > maxWidth) maxWidth = width;
      if (height > maxHeight) maxHeight = height;
    })
  );

  const handleReset = () => {
    setFillSize(width, height);
  };

  const isReset = fillWidth === width && fillHeight === height;

  return (
    <div className="flex flex-col h-full">
      <div className="sticky top-0 z-10 bg-white pb-4 flex gap-2">
        <Button
          icon={<FaArrowLeft />}
          onClick={onBack}
          color="bg-gray-600"
          hoverColor="hover:bg-gray-500"
          className="text-white p-2 rounded w-full"
        >
          Back
        </Button>
        <Button
          className="px-3"
          onClick={handleReset}
          icon={<FaRedo />}
          disabled={isReset || generatedImage !== null}
          color="bg-gray-600"
          hoverColor="hover:bg-gray-500"
        />
      </div>

      <div className="flex flex-col overflow-y-auto p-4 gap-4">
        <div
          className={`${selected?.color} text-white rounded-2xl py-8 flex flex-col items-center gap-3`}
        >
          <div className="flex gap-3 items-center">
            {selected?.icon && <selected.icon className="w-8 h-8" />}
            <Header>{selected?.name}</Header>
          </div>
        </div>

        {selected?.categories.map((category) => (
          <div key={category.category}>
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
      </div>
    </div>
  );
};

export default PresetCategory;
