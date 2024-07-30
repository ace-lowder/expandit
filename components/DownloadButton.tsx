import { useState } from "react";
import { useImage } from "@/context/ImageContext";
import { saveAs } from "file-saver";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const DownloadButton: React.FC = () => {
  const { image, width, height } = useImage();
  const [showPanel, setShowPanel] = useState(false);

  const handleDownload = () => {
    if (image) {
      saveAs(image as string, `image_original.png`);
    }
  };

  return (
    <div className="absolute top-4 right-4 flex flex-col items-end">
      <button
        onClick={() => setShowPanel(!showPanel)}
        className="bg-gray-300 text-white p-4 rounded-xl hover:bg-gray-400"
      >
        <ArrowDownTrayIcon className="w-6 h-6" />
      </button>
      {showPanel && (
        <div className="mt-2 bg-white p-4 rounded-lg shadow-lg flex flex-col">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Download Original {width}x{height}
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadButton;
