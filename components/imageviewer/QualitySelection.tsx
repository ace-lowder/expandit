interface QualitySelectionProps {
  selectedQuality: string;
  setSelectedQuality: (quality: string) => void;
}

const QualitySelection: React.FC<QualitySelectionProps> = ({
  selectedQuality,
  setSelectedQuality,
}) => {
  return (
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
  );
};

export default QualitySelection;
