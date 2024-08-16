"use client";

import { useEffect, useState } from "react";
import { useImage, useError } from "@/lib";
import { FaPlus, FaTrash } from "react-icons/fa";

const History = () => {
  const [pastImages, setPastImages] = useState<any[]>([]);
  const [isClient, setIsClient] = useState(false);

  const { showError } = useError();

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

  // This effect runs only on the client side
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
          showError(
            "Storage space limit reached (5mb). Delete some images to save more on refresh."
          );
        } else {
          throw e;
        }
      }
    }
  }, [pastImages, isClient]);

  const isMatch = (pastImage: any) => {
    const isImageSame = pastImage.image === image;
    const isGeneratedImageSame = pastImage.generatedImage === generatedImage;
    return isImageSame && isGeneratedImageSame;
  };

  const handleNewClick = () => {
    if (!image) {
      return;
    }

    if (!pastImages.some((pastImage) => isMatch(pastImage))) {
      const imageInfo = {
        image: image,
        imageName: imageName,
        imageSize: imageSize,
        width: width,
        height: height,
        fillWidth: fillWidth,
        fillHeight: fillHeight,
        generatedImage: generatedImage,
      };

      setPastImages([imageInfo, ...pastImages]);
    }

    setImage(null, "", 0);
    overrideFillSize(0, 0);
    setGeneratedImage(null);
  };

  const handleDeleteClick = (index: number) => {
    const updatedImages = [...pastImages];
    updatedImages.splice(index, 1);
    setPastImages(updatedImages);
  };

  if (!isClient) {
    // Render nothing or a loading state until the client-side is ready
    return null;
  }

  return (
    <div className="absolute z-50 bottom-4 left-4 flex gap-4">
      <button
        className="bg-gray-100 border-2 border-gray-700 text-gray-700 
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center items-center h-24 w-24 rounded-xl transition-all"
        onClick={handleNewClick}
      >
        <FaPlus className="w-7 h-7" />
      </button>

      {pastImages.map((pastImage, index) => (
        <div
          key={pastImage.image + pastImage.generatedImage}
          className="relative group"
        >
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleDeleteClick(index)}
          >
            <FaTrash />
          </button>

          <button
            className={`bg-gray-100 order border-2
              hover:outline hover:outline-1 hover:outline-gray-700
              flex justify-center rounded-xl transition-all w-24 h-24
              ${
                isMatch(pastImage)
                  ? "border-blue-500 outline outline-1 outline-blue-500"
                  : "border-gray-500"
              }`}
            onClick={() => {
              setImage(
                pastImage.image,
                pastImage.imageName,
                pastImage.imageSize
              );
              overrideFillSize(pastImage.fillWidth, pastImage.fillHeight);
              setGeneratedImage(pastImage.generatedImage);
            }}
          >
            <img
              className="w-full h-full object-cover p-1 rounded-xl"
              src={pastImage.image}
              alt={pastImage.imageName}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default History;
