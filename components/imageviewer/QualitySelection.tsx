interface QualitySelectionProps {
  selectedQuality: string;
  setSelectedQuality: (quality: string) => void;
}

const QualitySelection: React.FC<QualitySelectionProps> = ({
  selectedQuality,
  setSelectedQuality,
}) => {
  return (
    <div className="flex w-full rounded border border-gray-200 overflow-hidden">
      <button
        className={`flex-grow px-4 py-2 font-semibold ${
          selectedQuality === "SD"
            ? "bg-gray-300"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setSelectedQuality("SD")}
      >
        SD
      </button>
      <button
        className={`flex-grow px-4 py-2 font-semibold
          border-l border-l-gray-200 border-r border-r-gray-200 ${
            selectedQuality === "HD"
              ? "bg-gray-300"
              : "bg-gray-100 hover:bg-gray-200"
          }`}
        onClick={() => setSelectedQuality("HD")}
      >
        HD
      </button>
      <button
        className={`flex-grow px-4 py-2 font-semibold ${
          selectedQuality === "UHD"
            ? "bg-gray-300"
            : "bg-gray-100 hover:bg-gray-200"
        }`}
        onClick={() => setSelectedQuality("UHD")}
      >
        UHD
      </button>
    </div>
  );
};

export default QualitySelection;
