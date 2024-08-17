"use client";

import { useDownload } from "@/lib";
import {
  DefaultButton,
  DownloadInfo,
  Header,
  QualitySelection,
} from "@/components";

const DownloadPanel: React.FC<> = () => {
  const {
    downloadImages,
    selectedQuality,
    setSelectedQuality,
    handleDownload,
  } = useDownload();

  return (
    <div
      className={
        "bg-white text-gray-700 rounded-2xl shadow-lg flex flex-col gap-2 p-4 w-96 transition-all pointer-events-auto"
      }
    >
      <Header>Download</Header>
      <QualitySelection
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
        downloadImages={downloadImages}
      />
      <DownloadInfo
        {...(downloadImages[selectedQuality] || {
          image: null,
          imageName: "",
          width: 0,
          height: 0,
        })}
      />
      <DefaultButton
        onClick={handleDownload}
        disabled={!downloadImages[selectedQuality]}
      >
        Download {downloadImages[selectedQuality]?.width}x
        {downloadImages[selectedQuality]?.height}
      </DefaultButton>
    </div>
  );
};

export default DownloadPanel;
