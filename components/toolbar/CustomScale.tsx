"use client";

import { useState, useEffect } from "react";
import { FaRedo } from "react-icons/fa";
import { useImage, formatAspectRatio } from "@/lib";
import { DefaultButton } from "@/components";

const CustomScale: React.FC = () => {
  const { width, height, fillWidth, fillHeight, setFillSize } = useImage();
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
        setFillSize(width, height, true);
      }
    }
  };

  const handleReset = () => {
    setFillSize(width, height);
  };

  const isReset = fillWidth === width && fillHeight === height;
  const isApplied =
    customWidth === fillWidth && customHeight === fillHeight && !isReset;

  return (
    <div className="flex flex-col w-full gap-4">
      <form
        className="w-full"
        onSubmit={(e) => {
          e.preventDefault();
          handleCustomScale();
        }}
      >
        <p>Width</p>
        <input
          type="number"
          placeholder="Width"
          value={customWidth}
          onChange={(e) => setCustomWidth(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full mb-2"
        />
        <p>Height</p>
        <input
          type="number"
          placeholder="Height"
          value={customHeight}
          onChange={(e) => setCustomHeight(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button type="submit" className="hidden" />
      </form>
      <p className="mx-auto">Aspect Ratio: {aspectRatio}</p>

      <div className="flex gap-1">
        <DefaultButton
          className={`w-full`}
          onClick={handleCustomScale}
          disabled={isApplied}
          tip={isReset ? "Change the image size above to apply" : ""}
        >
          {isApplied ? "Applied" : "Apply"}
        </DefaultButton>
        <DefaultButton
          className="px-3"
          onClick={handleReset}
          icon={<FaRedo />}
          disabled={isReset}
        />
      </div>
    </div>
  );
};

export default CustomScale;
