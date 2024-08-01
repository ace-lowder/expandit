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
  setImage: (image: string | ArrayBuffer | null) => void;
  width: number;
  height: number;
  fillWidth: number;
  fillHeight: number;
  setFillWidth: (width: number) => void;
  setFillHeight: (height: number) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [fillWidth, setFillWidth] = useState(0);
  const [fillHeight, setFillHeight] = useState(0);

  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image as string;
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
        setFillWidth(img.width);
        setFillHeight(img.height);
      };
    }
  }, [image]);

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        width,
        height,
        fillWidth,
        fillHeight,
        setFillWidth,
        setFillHeight,
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
