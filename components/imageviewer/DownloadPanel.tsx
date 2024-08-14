"use client";

import { useState } from "react";
import { useImage, formatSize } from "@/lib";
import { saveAs } from "file-saver";
import {
  DefaultButton,
  DownloadInfo,
  Header,
  QualitySelection,
} from "@/components";

const DownloadPanel: React.FC = () => {
  const { image, width, height } = useImage();
  const [selectedQuality, setSelectedQuality] = useState("SD");

  const handleDownload = () => {
    if (image) {
      saveAs(image as string, `image_${width}x${height}.png`);
    }
  };

  const imageSize = formatSize(image ? width : 0);

  return (
    <div
      className="bg-white text-gray-700 rounded-2xl shadow-lg
      flex flex-col gap-2 p-4 w-96"
    >
      <Header>Download</Header>
      <QualitySelection
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
      />
      <DownloadInfo />
      <DefaultButton onClick={handleDownload} disabled={!image}>
        Download {width}x{height}
      </DefaultButton>
    </div>
  );
};

export default DownloadPanel;
