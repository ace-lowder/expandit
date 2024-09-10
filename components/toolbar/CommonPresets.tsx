import { useImage } from "@/lib/contexts/ImageContext";
import { FaDesktop, FaMobileAlt, FaUserCircle } from "react-icons/fa";
import Header from "../common/Header";

const CommonPresets: React.FC = () => {
  const { setFillSize } = useImage();

  const presets = [
    {
      label: "16 : 9",
      icon: FaDesktop,
      onClick: () => setFillSize(16, 9, true),
    },
    {
      label: "9 : 16",
      icon: FaMobileAlt,
      onClick: () => setFillSize(9, 16, true),
    },
    {
      label: "1 : 1",
      icon: FaUserCircle,
      onClick: () => setFillSize(1, 1, true),
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
