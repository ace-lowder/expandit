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
  overrideFillSize: (newWidth: number, newHeight: number) => void;
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
    if (img === null) {
      setImageState(img);
      setImageName(name);
      setImageSize(size);
      return;
    }

    const imgElement = new Image();
    imgElement.src = img as string;

    imgElement.onload = () => {
      const newWidth = imgElement.width;
      const newHeight = imgElement.height;

      setWidth(newWidth);
      setHeight(newHeight);

      setImageState(img);
      setImageName(name);
      setImageSize(size);
    };
  };

  const setFillSize = (
    newWidth: number | undefined,
    newHeight: number | undefined,
    replace = false
  ) => {
    if (newWidth === undefined || newHeight === undefined) return;

    let checkWidth = width;
    let checkHeight = height;

    if (generatedImage && replace) {
      setImageState(generatedImage);
      setGeneratedImage(null);

      checkWidth = fillWidth;
      checkHeight = fillHeight;
    }

    const originalAspectRatio = checkWidth / checkHeight;
    const fillAspectRatio = newWidth / newHeight;

    let targetWidth = newWidth;
    let targetHeight = newHeight;

    if (newWidth <= checkWidth || newHeight <= checkHeight) {
      if (fillAspectRatio > originalAspectRatio) {
        targetHeight = checkHeight;
        targetWidth = Math.floor(checkHeight * fillAspectRatio);

        if (targetWidth < checkWidth) {
          targetWidth = checkWidth;
          targetHeight = Math.floor(checkWidth / fillAspectRatio);
        }
      } else {
        targetWidth = checkWidth;
        targetHeight = Math.floor(checkWidth / fillAspectRatio);

        if (targetHeight < checkHeight) {
          targetHeight = checkHeight;
          targetWidth = Math.floor(checkHeight * fillAspectRatio);
        }
      }
    }

    if (targetWidth >= newWidth && targetHeight >= newHeight) {
      setFillWidth(targetWidth);
      setFillHeight(targetHeight);
    }
  };

  const overrideFillSize = (newWidth: number, newHeight: number) => {
    setFillWidth(newWidth);
    setFillHeight(newHeight);
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
        overrideFillSize,
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
