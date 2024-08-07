"use client";

import { useImage } from "@/context/ImageContext";

const ResetButton: React.FC = () => {
  const { width, height, setFillWidth, setFillHeight } = useImage();

  const handleReset = () => {
    setFillWidth(width);
    setFillHeight(height);
  };

  return (
    <button
      onClick={handleReset}
      className="bg-gray-600 text-white p-2 rounded w-full mb-4 hover:bg-gray-500"
    >
      Reset
    </button>
  );
};

export default ResetButton;
