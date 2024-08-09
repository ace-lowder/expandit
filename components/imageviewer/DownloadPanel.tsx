import { useState } from "react";
import { useImage } from "@/context/ImageContext";
import { saveAs } from "file-saver";
import { formatSize } from "@/constants/utils";

const DownloadPanel: React.FC = () => {
  const { image, width, height } = useImage();
  const [selectedQuality, setSelectedQuality] = useState("HD");

  const handleDownload = () => {
    if (image) {
      saveAs(image as string, `image_${width}x${height}.png`);
    }
  };

  const imageSize = formatSize(image ? width : 0);

  return (
    <div className="mt-2 bg-white text-black p-4 rounded-2xl shadow-lg flex flex-col w-96">
      <h2 className="text-xl font-bold mb-2">Download</h2>
      <p className="mb-2">
        {width}x{height} ({imageSize})
      </p>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${
            selectedQuality === "SD" ? "bg-gray-300" : "bg-gray-100"
          } rounded-l-lg`}
          onClick={() => setSelectedQuality("SD")}
        >
          SD
        </button>
        <button
          className={`px-4 py-2 ${
            selectedQuality === "HD" ? "bg-gray-300" : "bg-gray-100"
          }`}
          onClick={() => setSelectedQuality("HD")}
        >
          HD
        </button>
        <button
          className={`px-4 py-2 ${
            selectedQuality === "HD+" ? "bg-gray-300" : "bg-gray-100"
          } rounded-r-lg`}
          onClick={() => setSelectedQuality("HD+")}
        >
          HD+
        </button>
      </div>
      <button
        onClick={handleDownload}
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded mb-2"
      >
        Download {width}x{height}
      </button>
    </div>
  );
};

export default DownloadPanel;
