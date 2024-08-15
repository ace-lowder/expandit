interface DownloadImage {
  image: string | ArrayBuffer | null;
  imageName: string;
  width: number;
  height: number;
}

interface QualitySelectionProps {
  selectedQuality: string;
  setSelectedQuality: (quality: string) => void;
  downloadImages: {
    SD: DownloadImage | null;
    HD: DownloadImage | null;
    UHD: DownloadImage | null;
  };
}

const QualitySelection: React.FC<QualitySelectionProps> = ({
  selectedQuality,
  setSelectedQuality,
  downloadImages,
}) => {
  return (
    <div className="flex w-full rounded border border-gray-200 overflow-hidden">
      <button
        className={`flex-grow px-4 py-2 font-semibold ${
          selectedQuality === "SD"
            ? "bg-gray-300"
            : "bg-gray-100 hover:bg-gray-200"
        } ${!downloadImages.SD && "cursor-not-allowed opacity-50"}`}
        onClick={() => downloadImages.SD && setSelectedQuality("SD")}
        disabled={!downloadImages.SD}
      >
        SD
      </button>
      <button
        className={`flex-grow px-4 py-2 font-semibold border-l border-r border-gray-200 ${
          selectedQuality === "HD"
            ? "bg-gray-300"
            : "bg-gray-100 hover:bg-gray-200"
        } ${!downloadImages.HD && "cursor-not-allowed opacity-50"}`}
        onClick={() => downloadImages.HD && setSelectedQuality("HD")}
        disabled={!downloadImages.HD}
      >
        HD
      </button>
      <button
        className={`flex-grow px-4 py-2 font-semibold ${
          selectedQuality === "UHD"
            ? "bg-gray-300"
            : "bg-gray-100 hover:bg-gray-200"
        } ${!downloadImages.UHD && "cursor-not-allowed opacity-50"}`}
        onClick={() => downloadImages.UHD && setSelectedQuality("UHD")}
        disabled={!downloadImages.UHD}
      >
        UHD
      </button>
    </div>
  );
};

export default QualitySelection;
