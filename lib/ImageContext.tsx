"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface ImageContextProps {
  image: string | ArrayBuffer | null;
  setImage: (
    image: string | ArrayBuffer | null,
    imageName: string,
    imageSize: number
  ) => void;
  width: number;
  height: number;
  fillWidth: number;
  fillHeight: number;
  setFillSize: (newWidth: number, newHeight: number, replace?: boolean) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  generatedImage: string | null;
  setGeneratedImage: (url: string | null) => void;
  imageName: string;
  imageSize: number;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImageState] = useState<string | ArrayBuffer | null>(null);
  const [imageName, setImageName] = useState("");
  const [imageSize, setImageSize] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fillWidth, setFillWidth] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const setImage = (
    img: string | ArrayBuffer | null,
    name: string,
    size: number
  ) => {
    setImageState(img);
    setImageName(name);
    setImageSize(size);
  };

  const setFillSize = (
    newWidth: number,
    newHeight: number,
    replace = false
  ) => {
    console.error("Trying:", newWidth, newHeight);

    if (generatedImage && replace) {
      setImageState(generatedImage);
      setGeneratedImage(null);
    }

    if (newWidth > width && newHeight > height) {
      setFillWidth(newWidth);
      setFillHeight(newHeight);
      console.error("Setting New:", newWidth, newHeight);
      return;
    }

    const originalAspectRatio = width / height;
    const fillAspectRatio = newWidth / newHeight;

    let targetWidth = newWidth;
    let targetHeight = newHeight;

    if (newWidth <= width || newHeight <= height) {
      if (fillAspectRatio > originalAspectRatio) {
        // Adjust based on height to maintain aspect ratio without reducing width
        targetHeight = height;
        targetWidth = Math.floor(height * fillAspectRatio);

        // Ensure the width does not reduce below the original width
        if (targetWidth < width) {
          targetWidth = width;
          targetHeight = Math.floor(width / fillAspectRatio);
        }
      } else {
        // Adjust based on width to maintain aspect ratio without reducing height
        targetWidth = width;
        targetHeight = Math.floor(width / fillAspectRatio);

        // Ensure the height does not reduce below the original height
        if (targetHeight < height) {
          targetHeight = height;
          targetWidth = Math.floor(height * fillAspectRatio);
        }
      }
    }

    // Set the calculated size only if it doesn't scale down unnecessarily
    if (targetWidth >= newWidth && targetHeight >= newHeight) {
      setFillWidth(targetWidth);
      setFillHeight(targetHeight);
      console.error("Setting Target:", targetWidth, targetHeight);
      console.error("Reason:", width, height);
    }
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image as string;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);

        // Only update fillWidth and fillHeight on initial image load
        if (!generatedImage && fillWidth === 0 && fillHeight === 0) {
          setFillWidth(img.width);
          setFillHeight(img.height);
        }
      };
    }
  }, [image]);

  return (
    <ImageContext.Provider
      value={{
        image,
        imageName,
        imageSize,
        setImage,
        width,
        height,
        fillWidth,
        fillHeight,
        setFillSize,
        isGenerating,
        setIsGenerating,
        generatedImage,
        setGeneratedImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = () => {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};
