"use client";

import { useState, useEffect } from "react";
import { useImage, formatAspectRatio } from "@/lib";
import { FaDesktop, FaMobileAlt, FaUserCircle } from "react-icons/fa";
import { SquareButton } from "@/components";

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

const CustomScaleSection: React.FC = () => {
  const { fillWidth, fillHeight, setFillWidth, setFillHeight } = useImage();
  const [customWidth, setCustomWidth] = useState<number | string>(0);
  const [customHeight, setCustomHeight] = useState<number | string>(0);
  const [aspectRatio, setAspectRatio] = useState<string>("");

  useEffect(() => {
    setCustomWidth(fillWidth);
    setCustomHeight(fillHeight);

    setAspectRatio(formatAspectRatio(fillWidth, fillHeight));
  }, [fillWidth, fillHeight]);

  const handleCustomScale = () => {
    if (customWidth && customHeight) {
      const width = Number(customWidth);
      const height = Number(customHeight);
      if (!isNaN(width) && !isNaN(height)) {
        setFillWidth(width);
        setFillHeight(height);
      }
    }
  };

  const handleScaleClick = (width: number, height: number) => {
    setFillWidth(width);
    setFillHeight(height);
    setCustomWidth(width);
    setCustomHeight(height);
  };

  return (
    <div className="flex flex-col items-start w-full gap-4 mb-6">
      <h2 className="text-xl font-bold mb-2">Custom Scale</h2>
      <div className="flex flex-col w-full px-8">
        <p>Width</p>
        <input
          type="number"
          placeholder="Width"
          value={customWidth}
          onChange={(e) => setCustomWidth(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />
        <p>Height</p>
        <input
          type="number"
          placeholder="Height"
          value={customHeight}
          onChange={(e) => setCustomHeight(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4"
        />
        <p className="mx-auto">Aspect Ratio: {aspectRatio}</p>
        <button
          onClick={handleCustomScale}
          className="bg-gray-600 text-white mx-auto p-2 w-48 rounded mt-2 mb-4 hover:bg-gray-500"
          disabled={!customWidth || !customHeight}
        >
          Apply Custom Scale
        </button>
      </div>
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
