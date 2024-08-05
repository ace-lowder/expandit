import { useImage } from "@/context/ImageContext";
import { FaDesktop, FaMobileAlt, FaUserCircle } from "react-icons/fa";
import SquareButton from "../common/SquareButton";

const CustomScaleSection: React.FC = () => {
  const { setFillWidth, setFillHeight } = useImage();

  const scales = [
    {
      label: "Landscape",
      size: "1920x1080",
      icon: FaDesktop,
    },
    {
      label: "Mobile",
      size: "1080x1920",
      icon: FaMobileAlt,
    },
    {
      label: "Square",
      size: "1000x1000",
      icon: FaUserCircle,
    },
  ];

  const handleScaleClick = (width: number, height: number) => {
    setFillWidth(width);
    setFillHeight(height);
  };

  return (
    <div className="flex flex-col items-start w-full mb-6">
      <h2 className="text-xl font-bold mb-2">Custom Scale</h2>
      <div className="grid grid-cols-3 gap-4 mt-4 w-full">
        {scales.map((scale) => {
          const [width, height] = scale.size.split("x").map(Number);
          return (
            <div key={scale.label} className="flex flex-col items-center gap-2">
              <SquareButton
                icon={<scale.icon className="w-7 h-7" />}
                onClick={() => handleScaleClick(width, height)}
              />
              <span className="text-xs">{scale.size}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomScaleSection;
