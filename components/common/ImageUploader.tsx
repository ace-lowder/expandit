"use client";

import { useRef, useEffect } from "react";
import { useImage } from "@/lib";

const ImageUploader: React.FC<{ onImageUpload?: () => void }> = ({
  onImageUpload,
}) => {
  const { setImage } = useImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("The selected file is not a valid image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result, file.name, file.size);
        if (onImageUpload) onImageUpload();
      };
      reader.readAsDataURL(file);
    }
  };

  const isValidImageUrl = (url: string) => {
    return /\.(jpeg|jpg|gif|png|bmp|webp|svg)$/i.test(url);
  };

  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.startsWith("image")) {
          // Handle pasted image data
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result, file.name, file.size);
              if (onImageUpload) onImageUpload();
            };
            reader.readAsDataURL(file);
          }
          // Break the loop after handling the image, to avoid processing as a URL
          break;
        } else if (item.type === "text/plain") {
          // Handle pasted URL
          item.getAsString((url) => {
            if (isValidImageUrl(url)) {
              setImage(url, "", 0);
              if (onImageUpload) onImageUpload();
            } else {
              alert("The URL provided is not a valid image URL.");
            }
          });
        }
      }
    }
  };

  const handleURLUpload = () => {
    const url = prompt("Please enter the image URL");
    if (url) {
      if (isValidImageUrl(url)) {
        setImage(url, "", 0);
        if (onImageUpload) onImageUpload();
      } else {
        alert("The URL provided is not a valid image URL.");
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("The dropped file is not a valid image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result, file.name, file.size);
        if (onImageUpload) onImageUpload();
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);

  return (
    <div
      className="w-1/2 p-8 bg-white rounded-3xl shadow-md flex flex-col items-center max-w-sm"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Image
      </button>
      <p className="mt-4 text-gray-700">or drop a file</p>
      <p className="mt-2 text-sm text-gray-500">
        paste image or{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={handleURLUpload}
        >
          URL
        </span>
      </p>
    </div>
  );
};

export default ImageUploader;
