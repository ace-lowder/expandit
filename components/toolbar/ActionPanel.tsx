"use client";

import { useEffect, useState } from "react";
import { useImage } from "@/lib";
import { FaWandMagicSparkles, FaSpinner } from "react-icons/fa6";
import { DefaultButton } from "@/components";

const ActionPanel: React.FC = () => {
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
  const [canGenerate, setCanGenerate] = useState(false);

  useEffect(() => {
    setCanGenerate(width !== fillWidth || height !== fillHeight);
  }, [width, height, fillWidth, fillHeight]);

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
        console.log(data.url);

        const img = new Image();
        img.src = data.url;
        img.onload = () => {
          setGeneratedImage(data.url);
          setIsGenerating(false);
        };
        img.onerror = () => {
          console.error("Image failed to load.");
          setIsGenerating(false);
        };
      } else {
        const errorData = await response.json();
        console.error("Generative fill error:", errorData);
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white p-4 shadow-lg  text-black w-full border-t">
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
        action
      >
        {isGenerating ? "Generating" : "Expand"}
      </DefaultButton>
    </div>
  );
};

export default ActionPanel;
