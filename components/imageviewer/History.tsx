"use client";

import { useImage } from "@/lib";
import { FaPlus } from "react-icons/fa";
import { SquareButton } from "@/components";

const History = () => {
  const { setImage, setGeneratedImage } = useImage();

  const handleNewClick = () => {
    setImage(null, "", 0);
    setGeneratedImage(null);
  };

  return (
    <div className="absolute z-50 bottom-4 left-4 flex flex-col items-end">
      <SquareButton
        icon={<FaPlus className="w-7 h-7" />}
        onClick={handleNewClick}
      />
    </div>
  );
};

export default History;
