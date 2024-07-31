import { useState } from "react";
import { useImage } from "@/context/ImageContext";
import { saveAs } from "file-saver";
import { FaDownload } from "react-icons/fa";
import SquareButton from "@/components/common/SquareButton";

const DownloadButton: React.FC = () => {
  const { image, width, height } = useImage();
  const [showPanel, setShowPanel] = useState(false);

  const handleDownload = () => {
    if (image) {
      saveAs(image as string, `image_${width}x${height}.png`);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end">
      <SquareButton
        icon={<FaDownload className="w-7 h-7" />}
        onClick={() => setShowPanel(!showPanel)}
      />
      {showPanel && (
        <div className="mt-2 bg-white p-4 rounded-lg shadow-lg flex flex-col">
          <button
            onClick={handleDownload}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full mb-2"
          >
            Download {width}x{height}
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
