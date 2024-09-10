"use client";

import { DownloadProvider } from "@/lib/contexts/DownloadContext";
import { useImage } from "@/lib/contexts/ImageContext";
import { useState } from "react";
import Button from "../common/Button";
import { FaDownload } from "react-icons/fa";
import DownloadPanel from "./DownloadPanel";

const DownloadButton: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);

  const { image } = useImage();

  return (
    <DownloadProvider>
      <div className="absolute z-50 top-4 right-4 flex flex-col items-end gap-4 pointer-events-none">
        <Button
          variant="square"
          icon={<FaDownload className="w-7 h-7" />}
          onClick={() => setShowPanel(!showPanel)}
          disabled={!image}
          className="pointer-events-auto"
        />
        {showPanel && image && <DownloadPanel />}
      </div>
    </DownloadProvider>
  );
};

export default DownloadButton;
