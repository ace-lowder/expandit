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
  setFillSize: (width: number, height: number) => void;
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
  const [fillWidth, setFillWidthState] = useState(0);
  const [fillHeight, setFillHeightState] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isReplacing, setIsReplacing] = useState(false);

  const setImage = (
    img: string | ArrayBuffer | null,
    name: string,
    size: number
  ) => {
    if (image) {
      setIsReplacing(true);
    }
    setImageState(img);
    setImageName(name);
    setImageSize(size);
  };

  const setFillSize = (width: number, height: number) => {
    if (isNaN(width) || isNaN(height)) {
      console.error("Invalid width or height");
      return;
    }

    if (generatedImage) {
      console.log("Setting image to generated image");
      setImageState(generatedImage);
      setIsReplacing(true);
      setGeneratedImage(null);
    }

    console.log("Setting fill to", width, height);
    setFillWidthState(Math.ceil(width));
    setFillHeightState(Math.ceil(height));
  };

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image as string;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        if (!isReplacing) {
          console.log("Resetting fill");
          setFillWidthState(img.width);
          setFillHeightState(img.height);
        } else {
          setIsReplacing(false);
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
