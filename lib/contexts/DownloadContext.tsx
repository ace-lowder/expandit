"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { useUser } from "@clerk/nextjs";
import { useImage } from "./ImageContext";

interface DownloadImage {
  image: string | ArrayBuffer | null;
  imageName: string;
  width: number;
  height: number;
}

interface DownloadContextProps {
  downloadImages: {
    SD: DownloadImage | null;
    HD: DownloadImage | null;
    UHD: DownloadImage | null;
  };
  selectedQuality: "SD" | "HD" | "UHD";
  setSelectedQuality: React.Dispatch<React.SetStateAction<"SD" | "HD" | "UHD">>;
  handleDownload: () => void;
  unlocked: { [key: string]: boolean };
  checkUnlockStatus: () => Promise<void>;
  confirmUnlock: () => Promise<void>;
}

const DownloadContext = createContext<DownloadContextProps | undefined>(
  undefined
);

export const DownloadProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
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

  const [unlocked, setUnlocked] = useState<{ [key: string]: boolean }>({
    HD: false,
    UHD: false,
  });

  const { user } = useUser();
  const {
    image,
    imageName,
    width,
    height,
    fillWidth,
    fillHeight,
    generatedImage,
  } = useImage();

  const imagePrefix =
    typeof downloadImages[selectedQuality]?.image === "string"
      ? downloadImages[selectedQuality]?.image.slice(0, 50)
      : null;

  const checkUnlockStatus = async () => {
    if (!user || !imagePrefix) return;

    try {
      const response = await fetch(
        `/api/mongodb/unlock?clerkId=${
          user.id
        }&imagePrefix=${encodeURIComponent(imagePrefix)}`
      );
      const data = await response.json();
      const unlockedQualities = data.unlockedQualities || [];

      setUnlocked({
        HD: unlockedQualities.includes("HD"),
        UHD: unlockedQualities.includes("UHD"),
      });
    } catch (error) {
      console.error("Error fetching unlock status:", error);
    }
  };

  const confirmUnlock = async () => {
    if (!user || !imagePrefix) return;

    try {
      const response = await fetch("/api/mongodb/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          imagePrefix,
          quality: selectedQuality,
        }),
      });

      if (response.ok) {
        setUnlocked((prev) => ({ ...prev, [selectedQuality]: true }));
      } else {
        console.error("Error unlocking image", await response.text());
      }
    } catch (error) {
      console.error("Error unlocking image:", error);
    }
  };

  const getFileNameWithQuality = (
    originalName: string,
    quality: "SD" | "HD" | "UHD"
  ): string => {
    const defaultExtension = ".png";

    const lastDotIndex = originalName.lastIndexOf(".");
    const name =
      lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName;
    const extension =
      lastDotIndex !== -1 ? originalName.slice(lastDotIndex) : defaultExtension;

    return `${name}_${quality}${extension}`;
  };

  const handleDownload = () => {
    const downloadImage = downloadImages[selectedQuality];

    if (downloadImage?.image) {
      const fileName = getFileNameWithQuality(
        imageName || "image",
        selectedQuality
      );

      const img = new Image();
      img.src = downloadImage.image as string;
      img.crossOrigin = "Anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = downloadImage.width;
        canvas.height = downloadImage.height;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.drawImage(img, 0, 0, downloadImage.width, downloadImage.height);
          canvas.toBlob((blob) => {
            if (blob) {
              saveAs(blob, fileName);
            }
          }, "image/png");
        }
      };
    }
  };

  const calculateDownloadScale = (
    w: number,
    h: number,
    maxWidth: number,
    maxHeight: number
  ) => {
    if (w <= maxWidth && h <= maxHeight) {
      return { width: w, height: h };
    }

    const scaleFactor = Math.min(maxWidth / w, maxHeight / h);

    return {
      width: Math.ceil(w * scaleFactor),
      height: Math.ceil(h * scaleFactor),
    };
  };

  const createDownloadImage = (
    quality: "SD" | "HD" | "UHD"
  ): DownloadImage | null => {
    if (!image) return null;

    const baseImage = generatedImage || image;
    const baseWidth = generatedImage ? fillWidth : width;
    const baseHeight = generatedImage ? fillHeight : height;

    switch (quality) {
      case "SD": {
        const { width, height } = calculateDownloadScale(
          baseWidth,
          baseHeight,
          1024,
          1024
        );
        return {
          image: baseImage,
          imageName: getFileNameWithQuality(imageName || "image", "SD"),
          width,
          height,
        };
      }
      case "HD": {
        if (baseWidth <= 1024 && baseHeight <= 1024) return null;
        const { width, height } = calculateDownloadScale(
          baseWidth,
          baseHeight,
          1920,
          1920
        );
        return {
          image: baseImage,
          imageName: getFileNameWithQuality(imageName || "image", "HD"),
          width,
          height,
        };
      }
      case "UHD": {
        if (baseWidth <= 1920 && baseHeight <= 1920) return null;
        return {
          image: baseImage,
          imageName: getFileNameWithQuality(imageName || "image", "UHD"),
          width: baseWidth,
          height: baseHeight,
        };
      }
      default:
        return null;
    }
  };

  useEffect(() => {
    if (image) {
      setDownloadImages({
        SD: createDownloadImage("SD"),
        HD: createDownloadImage("HD"),
        UHD: createDownloadImage("UHD"),
      });
    }
  }, [image, generatedImage, imageName, width, height, fillWidth, fillHeight]);

  useEffect(() => {
    if (user) {
      setUnlocked({
        HD: true,
        UHD: true,
      });
    } else {
      checkUnlockStatus();
    }
  }, [user, imagePrefix]);

  return (
    <DownloadContext.Provider
      value={{
        downloadImages,
        selectedQuality,
        setSelectedQuality,
        handleDownload,
        unlocked,
        checkUnlockStatus,
        confirmUnlock,
      }}
    >
      {children}
    </DownloadContext.Provider>
  );
};

export const useDownload = () => {
  const context = useContext(DownloadContext);
  if (context === undefined) {
    throw new Error("useDownload must be used within a DownloadProvider");
  }
  return context;
};
