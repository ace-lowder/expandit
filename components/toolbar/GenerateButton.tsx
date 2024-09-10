"use client";

import { useError } from "@/lib/contexts/ErrorContext";
import { useImage } from "@/lib/contexts/ImageContext";
import { useEffect, useState } from "react";
import { FaWandMagicSparkles, FaSpinner } from "react-icons/fa6";
import Button from "../common/Button";

const GenerateButton: React.FC = () => {
  const {
    image,
    width,
    height,
    fillWidth,
    fillHeight,
    generatedImage,
    setGeneratedImage,
    isGenerating,
    setIsGenerating,
  } = useImage();

  const { showError } = useError();
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    setCanGenerate(width !== fillWidth || height !== fillHeight);
  }, [width, height, fillWidth, fillHeight]);

  const handleGenerativeFill = async () => {
    if (isGenerating) return;
    if (generatedImage) setGeneratedImage(null);

    setIsGenerating(true);

    try {
      const response = await fetch("/api/cloudinary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        const img = new Image();
        img.src = data.url;

        img.onload = () => {
          setGeneratedImage(data.url);
          setIsGenerating(false);
        };
        img.onerror = () => {
          showError("Failed to load the generated image. Please try again.");
          setIsGenerating(false);
        };
      } else {
        if (response.status === 413) {
          showError(
            "The image is too large to process. Please select an image under 1MB."
          );
        } else if (response.status === 400) {
          showError("Invalid request. Please check the image and try again.");
        } else if (response.status === 500) {
          showError("Server error occurred. Please try again later.");
        } else {
          const errorData = await response.json();
          console.error("Generative fill error:", errorData);
          showError("An unexpected error occurred. Please try again.");
        }

        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      showError(
        "Network error occurred. Please check your connection and try again."
      );
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full p-4 border-t bg-white shadow-lg">
      <Button
        className="w-full"
        onClick={handleGenerativeFill}
        icon={
          isGenerating ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaWandMagicSparkles />
          )
        }
        disabled={!canGenerate}
        color={generatedImage ? "bg-purple-500" : "bg-blue-500"}
        hoverColor={
          generatedImage ? "hover:bg-purple-600" : "hover:bg-blue-600"
        }
      >
        {isGenerating ? "Generating" : generatedImage ? "Regenerate" : "Expand"}
      </Button>
    </div>
  );
};

export default GenerateButton;
