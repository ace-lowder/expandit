"use client";

import { useState } from "react";
import { useDownload } from "@/lib";
import {
  Button,
  DownloadInfo,
  Header,
  QualitySelector,
  ConfirmUnlock,
} from "@/components";
import { FaUnlock } from "react-icons/fa";

const DownloadPanel: React.FC = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [unlocked, setUnlocked] = useState<{ [key: string]: boolean }>({
    HD: false,
    UHD: false,
  });

  const {
    downloadImages,
    selectedQuality,
    setSelectedQuality,
    handleDownload,
  } = useDownload();

  const handleConfirmUnlock = () => {
    setUnlocked((prev) => ({ ...prev, [selectedQuality]: true }));
    setIsConfirming(false);
  };

  const getDownloadButtonProps = (quality: string, isLocked: boolean) => {
    if (isLocked) {
      return {
        className: "w-full text-white",
        icon: <FaUnlock className="w-5 h-5 mr-2" />,
        text: `Unlock ${quality}`,
        color: "bg-blue-500",
        hoverColor: "bg-blue-600",
        onClick: () => setIsConfirming(true),
      };
    } else {
      return {
        className: "w-full",
        icon: null,
        text: `Download ${quality} ${downloadImages[selectedQuality]?.width}x
        ${downloadImages[selectedQuality]?.height}`,
        color: "bg-gray-400",
        hoverColor: "hover:bg-gray-500",
        onClick: handleDownload,
      };
    }
  };

  const isLocked =
    !unlocked[selectedQuality] &&
    (selectedQuality === "HD" || selectedQuality === "UHD");
  const buttonProps = getDownloadButtonProps(selectedQuality, isLocked);

  return (
    <div className="bg-white text-gray-700 rounded-2xl shadow-lg flex flex-col gap-2 p-4 w-96 transition-all pointer-events-auto">
      <Header>Download</Header>
      <QualitySelector
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
      <Button
        onClick={buttonProps.onClick}
        disabled={!downloadImages[selectedQuality]}
        className={buttonProps.className}
        color={buttonProps.color}
        hoverColor={buttonProps.hoverColor}
      >
        {buttonProps.icon}
        {buttonProps.text}
      </Button>
      <ConfirmUnlock
        quality={selectedQuality}
        onConfirm={handleConfirmUnlock}
        onCancel={() => setIsConfirming(false)}
        visible={isConfirming}
      />
    </div>
  );
};

export default DownloadPanel;
