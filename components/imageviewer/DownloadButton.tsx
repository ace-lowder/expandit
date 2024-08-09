import { useState } from "react";
import { FaDownload } from "react-icons/fa";
import DownloadPanel from "./DownloadPanel";
import SquareButton from "@/components/common/SquareButton";

const DownloadButton: React.FC = () => {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="absolute z-20 top-4 right-4 flex flex-col items-end">
      <SquareButton
        icon={<FaDownload className="w-7 h-7" />}
        onClick={() => setShowPanel(!showPanel)}
      />
      {showPanel && <DownloadPanel />}
    </div>
  );
};

export default DownloadButton;
