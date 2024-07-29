"use client";

import { createContext, useState, useContext, ReactNode } from "react";

interface ImageContextProps {
  image: string | ArrayBuffer | null;
  setImage: (image: string | ArrayBuffer | null) => void;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const useImage = (): ImageContextProps => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImage must be used within an ImageProvider");
  }
  return context;
};

export const ImageProvider = ({ children }: { children: ReactNode }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
};
