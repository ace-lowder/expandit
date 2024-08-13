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
  setFillWidth: (width: number) => void;
  setFillHeight: (height: number) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  generatedImage: string | null;
  setGeneratedImage: (url: string) => void;
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
  const [fillWidth, setFillWidthState] = useState(0);
  const [fillHeight, setFillHeightState] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const setImage = (
    image: string | ArrayBuffer | null,
    name: string,
    size: number
  ) => {
    setImageState(image);
    setImageName(name);
    setImageSize(size);
  };

  const setClampedFillWidth = (width: number) => {
    if (generatedImage) {
      setImageState(generatedImage);
      setGeneratedImage(null);
    }

    setFillWidthState(Math.ceil(width));
  };

  const setClampedFillHeight = (height: number) => {
    if (generatedImage) {
      setImageState(generatedImage);
      setGeneratedImage(null);
    }

    setFillHeightState(Math.ceil(height));
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image as string;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setClampedFillWidth(img.width);
        setClampedFillHeight(img.height);
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
        setFillWidth: setClampedFillWidth,
        setFillHeight: setClampedFillHeight,
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
