import { useImage } from "@/lib";
import { FaDesktop, FaMobileAlt, FaUserCircle } from "react-icons/fa";
import { Header } from "@/components";

const CommonPresets: React.FC = () => {
  const { setFillWidth, setFillHeight } = useImage();

  const handlePresetClick = (width: number, height: number) => {
    setFillWidth(width);
    setFillHeight(height);
  };

  const presets = [
    {
      label: "16 : 9",
      icon: FaDesktop,
      onClick: () => handlePresetClick(16, 9),
    },
    {
      label: "9 : 16",
      icon: FaMobileAlt,
      onClick: () => handlePresetClick(9, 16),
    },
    {
      label: "1 : 1",
      icon: FaUserCircle,
      onClick: () => handlePresetClick(1, 1),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Header>Common Sizes</Header>
      <div className="grid grid-cols-3 gap-2 w-full">
        {presets.map((preset) => (
          <div className="flex flex-col gap-1" key={preset.label}>
            <button
              className="bg-gray-200 border border-gray-300 text-gray-700 
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center p-7 rounded-xl transition-all"
              onClick={preset.onClick}
            >
              {<preset.icon className="w-8 h-8" />}
            </button>
            <span className="text-gray-700 text-center text-sm font-semibold">
              {preset.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonPresets;
