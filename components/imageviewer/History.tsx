"use client";

import { useImage } from "@/lib";
import { FaPlus } from "react-icons/fa";

const pastImages: any[] = [];

const History = () => {
  const {
    image,
    imageName,
    imageSize,
    setImage,
    width,
    height,
    fillWidth,
    fillHeight,
    setFillSize,
    generatedImage,
    setGeneratedImage,
  } = useImage();

  const isMatch = (pastImage: any) => {
    const isImageSame = pastImage.image === image;
    const isGeneratedImageSame = pastImage.generatedImage === generatedImage;
    return isImageSame && isGeneratedImageSame;
  };

  const handleNewClick = () => {
    if (!image) {
      return;
    }

    if (pastImages.some((pastImage) => isMatch(pastImage))) {
      setImage(null, "", 0);
      setGeneratedImage(null);
      return;
    }

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

    pastImages.unshift(imageInfo);

    setImage(null, "", 0);
    setGeneratedImage(null);
  };

  return (
    <div className="absolute z-50 bottom-4 left-4 flex gap-4">
      <button
        className="bg-gray-200 border-2 border-gray-700 text-gray-700 
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center items-center h-24 w-24 rounded-xl transition-all"
        onClick={handleNewClick}
      >
        <FaPlus className="w-7 h-7" />
      </button>

      {pastImages.map((pastImage) => (
        <button
          key={pastImage.image + pastImage.generatedImage}
          className={`bg-gray-200 order border-2
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center rounded-xl transition-all w-24 h-24
            ${
              isMatch(pastImage)
                ? "border-blue-500 outline outline-1 outline-blue-500"
                : "border-gray-500"
            }`}
          onClick={() => {
            setFillSize(pastImage.fillWidth, pastImage.fillHeight);
            setImage(pastImage.image, pastImage.imageName, pastImage.imageSize);
            setGeneratedImage(pastImage.generatedImage);
          }}
        >
          <img
            className="w-full h-full object-cover p-1 rounded-xl"
            src={pastImage.image}
            alt={pastImage.imageName}
          />
        </button>
      ))}
    </div>
  );
};

export default History;
