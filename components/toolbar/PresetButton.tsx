import { useImage } from "@/lib";

interface PresetButtonProps {
  label: string;
  color: string;
  size: string;
  maxWidth: number;
  maxHeight: number;
}

const PresetButton: React.FC<PresetButtonProps> = ({
  label,
  color,
  size,
  maxWidth,
  maxHeight,
}) => {
  const { setFillSize } = useImage();
  const [width, height] = size.split("x").map(Number);

  const maxButtonSize = 200;
  const scale = Math.min(maxButtonSize / maxWidth, maxButtonSize / maxHeight);
  const style = {
    width: width * scale,
    height: height * scale,
  };

  const handleClick = () => {
    setFillSize(width, height, true);
  };

  return (
    <button
      className="bg-gray-200 border border-gray-300 text-gray-700 
      hover:outline hover:outline-1 hover:outline-gray-700
      flex flex-col items-center justify-center p-4 rounded-xl transition-all"
      onClick={handleClick}
    >
      <div
        className="bg-gray-700 opacity-50 mb-2"
        style={{ ...style, border: "1px solid #fff" }}
      ></div>
      <span>{label}</span>
      <span className="text-sm">{size}</span>
    </button>
  );
};

export default PresetButton;
