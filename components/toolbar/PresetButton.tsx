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
  const [width, height] = size.split("x").map(Number);

  const maxButtonSize = 200;
  const scale = Math.min(maxButtonSize / maxWidth, maxButtonSize / maxHeight);
  const style = {
    width: width * scale,
    height: height * scale,
  };

  return (
    <button className="flex flex-col items-center bg-blue-500 text-white p-4 rounded-xl">
      <div
        className="bg-white mb-2"
        style={{ ...style, border: "1px solid #fff" }}
      ></div>
      <span>{label}</span>
      <span className="text-sm">{size}</span>
    </button>
  );
};

export default PresetButton;
