"use client";

import { useEffect, useState } from "react";
import { useImage, useError } from "@/lib";
import { FaWandMagicSparkles, FaSpinner } from "react-icons/fa6";
import { DefaultButton } from "@/components";

const ActionPanel: React.FC = () => {
  const {
    image,
    imageName,
    imageSize,
    setImage,
    width,
    height,
    fillWidth,
    fillHeight,
    generatedImage,
    setGeneratedImage,
    isGenerating,
    setIsGenerating,
  } = useImage();

  const { showError } = useError(); // Use the useError hook to access the showError function
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    setCanGenerate(width !== fillWidth || height !== fillHeight);
  }, [width, height, fillWidth, fillHeight]);

  const handleGenerativeFill = async () => {
    if (isGenerating) {
      return;
    }

    if (generatedImage) {
      setGeneratedImage(null);
    }

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
      } else if (response.status === 413) {
        // Trigger an error message if the image is too large
        showError(
          "The image is too large to process. Please select an image under 1MB."
        );
        setIsGenerating(false);
      } else if (response.status === 400) {
        // Handle 400 Bad Request error
        showError("Invalid request. Please check the image and try again.");
        setIsGenerating(false);
      } else if (response.status === 500) {
        // Handle 500 Internal Server Error
        showError("Server error occurred. Please try again later.");
        setIsGenerating(false);
      } else {
        const errorData = await response.json();
        console.error("Generative fill error:", errorData);
        showError("An unexpected error occurred. Please try again.");
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
    <div className="bg-white p-4 shadow-lg text-black w-full border-t">
      <DefaultButton
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
        action={!generatedImage}
        secondary={generatedImage !== null}
      >
        {isGenerating ? "Generating" : generatedImage ? "Regenerate" : "Expand"}
      </DefaultButton>
    </div>
  );
};

export default ActionPanel;
