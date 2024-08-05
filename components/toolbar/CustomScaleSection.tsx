import { useImage } from "@/context/ImageContext";
import { FaDesktop, FaMobileAlt, FaUserCircle } from "react-icons/fa";
import SquareButton from "../common/SquareButton";

const CustomScaleSection: React.FC = () => {
  const { image, imageName, width, height, imageSize } = useImage();

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

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatAspectRatio = (width: number, height: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const aspectRatio =
    width && height ? formatAspectRatio(width, height) : "N/A";

  return (
    <div className="flex flex-col items-start w-full mb-6">
      {image && (
        <div className="flex flex-col items-center w-full mb-4">
          <img
            src={typeof image === "string" ? image : ""}
            alt="Thumbnail"
            className="w-24 h-24 object-contain mb-2"
          />
          <span className="text-gray-700">{imageName || "No Image Name"}</span>
          <span className="text-gray-700">
            {width}x{height} ({formatSize(imageSize)})
          </span>
          <span className="text-gray-700">Aspect Ratio: {aspectRatio}</span>
        </div>
      )}
      <h2 className="text-xl font-bold text-center mb-2">Custom Scale</h2>
      <div className="grid grid-cols-3 gap-4 mt-4 w-full">
        {scales.map((scale) => (
          <div key={scale.label} className="flex flex-col items-center gap-2">
            <SquareButton
              icon={<scale.icon className="w-7 h-7" />}
              onClick={() => {}}
            />
            <span className="text-xs">{scale.size}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomScaleSection;
