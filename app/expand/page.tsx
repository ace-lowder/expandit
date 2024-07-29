// pages/expand.tsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import ImageUploader from "@/components/ImageUploader";

const ExpandPage = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      {/* Toolbar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold text-black mb-4">Toolbar</h2>
        {/* Placeholder for other toolbar items */}
        <div className="mt-4 text-black">Toolbar Items</div>
      </div>

      {/* App Area */}
      <div className="w-3/4 bg-gray-100 p-4 flex justify-center items-center">
        {image ? (
          <img
            src={image as string}
            alt="Uploaded"
            className="max-w-full h-auto"
          />
        ) : (
          <ImageUploader setImage={setImage} />
        )}
      </div>
    </div>
  );
};

export default ExpandPage;
