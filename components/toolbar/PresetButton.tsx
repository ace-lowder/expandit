import { useImage } from "@/context/ImageContext";

interface PresetButtonProps {
  label: string;
  size: string;
  maxWidth: number;
  maxHeight: number;
}

const PresetButton: React.FC<PresetButtonProps> = ({
  label,
  size,
  maxWidth,
  maxHeight,
}) => {
  const { setRatio } = useImage();
  const [width, height] = size.split("x").map(Number);

  const maxButtonSize = 200;
  const scale = Math.min(maxButtonSize / maxWidth, maxButtonSize / maxHeight);

  const handleClick = () => {
    setRatio(width / height);
  };

  return (
    <button
      onClick={handleClick}
      className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl"
    >
      <div
        className="bg-white mb-2"
        style={{
          width: maxButtonSize,
          height: maxButtonSize * (height / width),
          border: "1px solid #fff",
          aspectRatio: `${width}/${height}`,
        }}
      ></div>
      <span>{label}</span>
      <span className="text-sm">{size}</span>
    </button>
  );
};

export default PresetButton;
