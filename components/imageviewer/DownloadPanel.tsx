"use client";

import { useEffect, useState } from "react";
import { useImage } from "@/lib";
import { saveAs } from "file-saver";
import {
  DefaultButton,
  DownloadInfo,
  Header,
  QualitySelection,
} from "@/components";

interface DownloadImage {
  image: string | ArrayBuffer | null;
  imageName: string;
  width: number;
  height: number;
}

const emptyImage = {
  image: null,
  imageName: "",
  width: 0,
  height: 0,
};

interface DownloadPanelProps {
  hidden: boolean;
}

const DownloadPanel: React.FC<DownloadPanelProps> = ({ hidden }) => {
  const [selectedQuality, setSelectedQuality] = useState<"SD" | "HD" | "UHD">(
    "SD"
  );
  const [downloadImages, setDownloadImages] = useState<{
    SD: DownloadImage | null;
    HD: DownloadImage | null;
    UHD: DownloadImage | null;
  }>({
    SD: null,
    HD: null,
    UHD: null,
  });

  const {
    image,
    imageName,
    width,
    height,
    fillWidth,
    fillHeight,
    generatedImage,
  } = useImage();

  const handleDownload = () => {
    const downloadImage = downloadImages[selectedQuality];

    if (downloadImage?.image) {
      saveAs(
        downloadImage.image as string,
        `${downloadImage.imageName}_${downloadImage.width}x${downloadImage.height}.png`
      );
    }
  };

  const calculateDownloadScale = (
    w: number,
    h: number,
    maxWidth: number,
    maxHeight: number
  ) => {
    if (w < maxWidth && h < maxHeight) {
      return { width: w, height: h };
    }

    const scaleWidth = maxWidth / w;
    const scaleHeight = maxHeight / h;
    const scaleFactor = Math.min(scaleWidth, scaleHeight);

    return {
      width: Math.ceil(w * scaleFactor),
      height: Math.ceil(h * scaleFactor),
    };
  };

  const createDownloadImage = (quality: string): DownloadImage | null => {
    if (!image) return null;

    const baseImage = generatedImage || image;
    const baseWidth = generatedImage ? fillWidth : width;
    const baseHeight = generatedImage ? fillHeight : height;

    if (quality === "SD") {
      const { width, height } = calculateDownloadScale(
        baseWidth,
        baseHeight,
        1280,
        1280
      );
      return { image: baseImage, imageName: `${imageName}_SD`, width, height };
    } else if (quality === "HD") {
      if (baseWidth < 1280 && baseHeight < 1280) return null;
      const { width, height } = calculateDownloadScale(
        baseWidth,
        baseHeight,
        1920,
        1920
      );
      return { image: baseImage, imageName: `${imageName}_HD`, width, height };
    } else if (quality === "UHD") {
      if (baseWidth < 1920 && baseHeight < 1920) return null;
      return {
        image: baseImage,
        imageName: `${imageName}_UHD`,
        width: baseWidth,
        height: baseHeight,
      };
    }

    return null;
  };

  useEffect(() => {
    if (!image) return;

    setDownloadImages({
      SD: createDownloadImage("SD"),
      HD: createDownloadImage("HD"),
      UHD: createDownloadImage("UHD"),
    });
  }, [image, generatedImage, imageName]);

  return (
    <div
      className={`bg-white text-gray-700 rounded-2xl shadow-lg
      flex flex-col gap-2 p-4 w-96 ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      } transition-all`}
    >
      <Header>Download</Header>
      <QualitySelection
        selectedQuality={selectedQuality}
        setSelectedQuality={setSelectedQuality}
        downloadImages={downloadImages}
      />
      <DownloadInfo {...(downloadImages[selectedQuality] || emptyImage)} />
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
