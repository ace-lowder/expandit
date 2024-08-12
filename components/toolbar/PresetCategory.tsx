import { DefaultButton, Header, PresetButton } from "@/components";
import { presets } from "@/lib";
import { FaArrowLeft } from "react-icons/fa";

interface PresetCategoryProps {
  selectedSocial: string | null;
  onBack: () => void;
}

const PresetCategory: React.FC<PresetCategoryProps> = ({
  selectedSocial,
  onBack,
}) => {
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

  return (
    <>
      <DefaultButton icon={<FaArrowLeft />} onClick={onBack}>
        Back
      </DefaultButton>
      <div
        className={`${selected?.color} text-white
        rounded-2xl py-8
        flex flex-col items-center gap-3`}
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
                color={selected?.color}
                size={preset.size}
                maxWidth={maxWidth}
                maxHeight={maxHeight}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PresetCategory;
