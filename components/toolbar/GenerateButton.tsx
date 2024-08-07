"use client";

import { useImage } from "@/context/ImageContext";

const GenerateButton: React.FC = () => {
  const {
    image,
    width,
    height,
    fillWidth,
    fillHeight,
    setGeneratedImage,
    isGenerating,
    setIsGenerating,
  } = useImage();

  const handleGenerativeFill = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/generativeFill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: image,
          dimensions: {
            width: Math.round(fillWidth),
            height: Math.round(fillHeight),
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedImage(data.url);
      } else {
        const errorData = await response.json();
        console.error("Generative fill error:", errorData);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = fillWidth === width && fillHeight === height;

  return (
    <button
      onClick={handleGenerativeFill}
      disabled={isDisabled || isGenerating}
      className={`${
        isDisabled ? "bg-gray-400" : "bg-blue-500"
      } text-white p-2 rounded w-full`}
    >
      {isGenerating ? "Generating..." : "Expand"}
    </button>
  );
};

export default GenerateButton;
