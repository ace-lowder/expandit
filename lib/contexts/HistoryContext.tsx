"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useImage } from "@/lib/contexts/ImageContext";

const HistoryContext = createContext<any>(null);

export const useHistory = () => useContext(HistoryContext);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pastImages, setPastImages] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);
  const {
    image,
    imageName,
    imageSize,
    setImage,
    width,
    height,
    fillWidth,
    fillHeight,
    overrideFillSize,
    generatedImage,
    setGeneratedImage,
  } = useImage();

  useEffect(() => {
    setIsClient(true);
    const storedImages = localStorage.getItem("pastImages");
    if (storedImages) {
      setPastImages(JSON.parse(storedImages));
    }
  }, []);

  useEffect(() => {
    if (isClient && pastImages.length > 0) {
      try {
        localStorage.setItem("pastImages", JSON.stringify(pastImages));
      } catch (e) {
        if (e instanceof DOMException && e.name === "QuotaExceededError") {
          console.error("Storage space limit reached. Delete some images.");
        } else {
          throw e;
        }
      }
    }
  }, [pastImages, isClient]);

  const saveImage = () => {
    if (!image) return;

    const isMatch = (pastImage: any) => {
      const isImageSame = pastImage.image === image;
      const isGeneratedImageSame = pastImage.generatedImage === generatedImage;
      return isImageSame && isGeneratedImageSame;
    };

    if (!pastImages.some(isMatch)) {
      const imageInfo = {
        image,
        imageName,
        imageSize,
        width,
        height,
        fillWidth,
        fillHeight,
        generatedImage,
      };

      setPastImages([imageInfo, ...pastImages]);
    }

    setImage(null, "", 0);
    overrideFillSize(0, 0);
    setGeneratedImage(null);
  };

  const deleteImage = (index: number) => {
    const updatedImages = [...pastImages];
    updatedImages.splice(index, 1);
    setPastImages(updatedImages);
  };

  return (
    <HistoryContext.Provider value={{ pastImages, saveImage, deleteImage }}>
      {children}
    </HistoryContext.Provider>
  );
};
