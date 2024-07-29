"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const ExpandPage = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Toolbar */}
      <div className="w-1/4 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold text-black mb-4">Toolbar</h2>
        {/* Placeholder for other toolbar items */}
        <div className="mt-4 text-black">Toolbar Items</div>
      </div>

      {/* App Area */}
      <div className="w-3/4 bg-gray-100 p-4">
        {image ? (
          <img
            src={image as string}
            alt="Uploaded"
            className="max-w-full h-auto"
          />
        ) : (
          <p className="text-gray-700">No image uploaded.</p>
        )}
      </div>
    </div>
  );
};

export default ExpandPage;
