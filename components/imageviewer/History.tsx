"use client";

import { FaPlus, FaTrash } from "react-icons/fa";
import { useHistory } from "@/lib/contexts/HistoryContext"; // Import the useHistory hook
import { useImage } from "@/lib/contexts/ImageContext";

const History = () => {
  const { pastImages, saveImage, deleteImage } = useHistory(); // Get the history functions
  const { setImage, overrideFillSize, setGeneratedImage } = useImage();

  return (
    <div className="absolute z-40 bottom-4 left-4 flex gap-4">
      <button
        className="bg-gray-100 border-2 border-gray-700 text-gray-700 
            hover:outline hover:outline-1 hover:outline-gray-700
            flex justify-center items-center h-24 w-24 rounded-xl transition-all"
        onClick={saveImage} // Call saveImage when the button is clicked
      >
        <FaPlus className="w-7 h-7" />
      </button>

      {pastImages.map((pastImage: any, index: number) => (
        <div
          key={pastImage.image + pastImage.generatedImage}
          className="relative group"
        >
          <button
            className="absolute -top-2 -right-2 bg-red-500 text-white p-2 rounded-full 
                       opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => deleteImage(index)}
          >
            <FaTrash />
          </button>

          <button
            className={`bg-gray-100 border border-2
              hover:outline hover:outline-1 hover:outline-gray-700
              flex justify-center rounded-xl transition-all w-24 h-24
              ${
                pastImage.image
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
