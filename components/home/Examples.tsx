"use client";

import { useState, useEffect } from "react";
import { Button, Header } from "@/components";

const categories = [
  { name: "landscapes", displayName: "Landscapes" },
  { name: "people", displayName: "People" },
  { name: "products", displayName: "Products" },
  { name: "animals", displayName: "Animals" },
  { name: "graphics", displayName: "Graphics" },
];

const exampleImages = categories.reduce((acc: any, category) => {
  acc[category.name] = {
    initial: `/examples/${category.name}.png`,
    expanded: `/examples/${category.name}-expanded.png`,
  };
  return acc;
}, {});

const Examples = () => {
  const [selectedCategory, setSelectedCategory] = useState("landscapes");
  const [isShimmering, setIsShimmering] = useState(true);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    setIsShimmering(true);
    setIsWiping(false);

    const shimmerTimeout = setTimeout(() => {
      setIsShimmering(false);
      setIsWiping(true);
    }, 500);

    return () => {
      clearTimeout(shimmerTimeout);
    };
  }, [selectedCategory]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-24 px-4 bg-gray-100 gap-8 overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-2">
        <Header size="3xl">Examples</Header>
        <p className="text-center">
          Each of these examples were generated using Expandit
        </p>
      </div>
      <div className="flex justify-center flex-wrap gap-4">
        {categories.map((category) => (
          <Button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className="w-28"
            color={
              selectedCategory === category.name ? "bg-blue-500" : "bg-gray-700"
            }
            hoverColor={
              selectedCategory === category.name ? "bg-blue-600" : "bg-gray-500"
            }
          >
            {category.displayName}
          </Button>
        ))}
      </div>

      <div className="relative w-[448px] md:w-[896px] h-48 md:h-96 flex items-center justify-center bg-gray-200 overflow-hidden rounded-2xl">
        {/* Shimmer Effect */}
        {isShimmering && (
          <div
            className={`absolute z-10 w-full h-full rounded-2xl ${
              isShimmering ? "fade-in" : "fade-out"
            }`}
          >
            <div className="shimmer rounded-2xl" />
          </div>
        )}

        {/* Checkerboard Background */}
        <div className="absolute checkerboard transition-all w-full h-full rounded-2xl" />

        {/* Generated Image */}
        {isWiping && (
          <img
            src={exampleImages[selectedCategory].expanded}
            alt="Expanded Example"
            className="absolute pointer-events-none wipe-in w-full h-full rounded-2xl"
          />
        )}

        {/* Original Image */}
        <img
          src={exampleImages[selectedCategory].initial}
          alt="Exmample Image"
          className={`z-20 transition-all w-48 h-48 md:w-96 md:h-96 ${
            isWiping ? "fade-out-delay" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default Examples;
