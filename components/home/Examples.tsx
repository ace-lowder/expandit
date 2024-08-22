"use client";

import { useState } from "react";
import { Button } from "@/components";

const Examples = () => {
  const [selectedCategory, setSelectedCategory] = useState("landscapes");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-24 px-4 bg-gray-100">
      <div className="flex justify-center gap-4 mb-8">
        <Button
          onClick={() => handleCategoryChange("landscapes")}
          className={selectedCategory === "landscapes" ? "bg-blue-500" : ""}
        >
          Landscapes
        </Button>
        <Button
          onClick={() => handleCategoryChange("people")}
          className={selectedCategory === "people" ? "bg-blue-500" : ""}
        >
          People
        </Button>
        <Button
          onClick={() => handleCategoryChange("products")}
          className={selectedCategory === "products" ? "bg-blue-500" : ""}
        >
          Products
        </Button>
        <Button
          onClick={() => handleCategoryChange("animals")}
          className={selectedCategory === "animals" ? "bg-blue-500" : ""}
        >
          Animals
        </Button>
        <Button
          onClick={() => handleCategoryChange("graphics")}
          className={selectedCategory === "graphics" ? "bg-blue-500" : ""}
        >
          Graphics
        </Button>
      </div>

      <div className="w-full max-w-4xl h-96 flex items-center justify-center">
        {selectedCategory === "landscapes" && (
          <div className="w-full h-full bg-blue-300"></div>
        )}
        {selectedCategory === "people" && (
          <div className="w-full h-full bg-red-300"></div>
        )}
        {selectedCategory === "products" && (
          <div className="w-full h-full bg-green-300"></div>
        )}
        {selectedCategory === "animals" && (
          <div className="w-full h-full bg-yellow-300"></div>
        )}
        {selectedCategory === "graphics" && (
          <div className="w-full h-full bg-purple-300"></div>
        )}
      </div>
    </div>
  );
};

export default Examples;
