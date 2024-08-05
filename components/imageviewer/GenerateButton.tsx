"use client";

import { useImage } from "@/context/ImageContext";

const GenerateButton: React.FC = () => {
  const { image, fillWidth, fillHeight, setGeneratedImage } = useImage();

  const handleGenerativeFill = async () => {
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
    }
  };

  return (
    <button
      onClick={handleGenerativeFill}
      className="absolute top-4 z-20 bg-blue-500 text-white p-2 rounded"
    >
      Generate Fill
    </button>
  );
};

export default GenerateButton;
