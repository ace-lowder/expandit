"use client";

import { useState } from "react";
import { useImage } from "@/lib";
import { FaDownload } from "react-icons/fa";
import { SquareButton, DownloadPanel } from "@/components";

const DownloadButton: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);

  const { image } = useImage();

  return (
    <div className="absolute z-50 top-4 right-4 flex flex-col items-end gap-4 pointer-events-none">
      <SquareButton
        icon={<FaDownload className="w-7 h-7" />}
        onClick={() => setShowPanel(!showPanel)}
        disabled={!image}
        className="pointer-events-auto"
      />
      <DownloadPanel hidden={!showPanel || !image} />
    </div>
  );
};

export default DownloadButton;
