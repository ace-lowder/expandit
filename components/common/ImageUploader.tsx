"use client";

import { useRef, useEffect, useState } from "react";
import { useError } from "@/lib/contexts/ErrorContext";
import { useImage } from "@/lib/contexts/ImageContext";
import Button from "./Button";

interface ImageUploaderProps {
  onImageUpload?: () => void;
  className?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  className,
}) => {
  const { showError } = useError();
  const { setImageDownscaled } = useImage();
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const imageList = [
    "https://static.remove.bg/uploader-examples/person/",
    "https://static.remove.bg/uploader-examples/animal/",
    "https://static.remove.bg/uploader-examples/car/",
    "https://static.remove.bg/uploader-examples/product/",
  ];

  const generateRandomNumbers = () => {
    const numbers = imageList.map(() => Math.floor(Math.random() * 6) + 1);
    setRandomNumbers(numbers);
  };

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("The selected file is not a valid image.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDownscaled(reader.result, file.name, file.size);
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
    let imageLoaded = false;

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.type.startsWith("image")) {
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              const img = new Image();
              img.onload = () => {
                imageLoaded = true;
                setImageDownscaled(reader.result, file.name, file.size);
                if (onImageUpload) onImageUpload();
              };
              img.onerror = () => {
                if (i === items.length - 1 && !imageLoaded) {
                  showError("Invalid image.");
                }
              };
              img.src = reader.result as string;
            };
            reader.readAsDataURL(file);
          }
          break;
        } else if (item.type === "text/plain") {
          item.getAsString((url) => {
            const img = new Image();
            img.onload = () => {
              imageLoaded = true;
              setImageDownscaled(url, "", 0);
              if (onImageUpload) onImageUpload();
            };
            img.onerror = () => {
              if (i === items.length - 1 && !imageLoaded) {
                showError("The URL provided is not a valid image URL.");
              }
            };
            img.src = url;
          });
        }
      }
    }
  };

  const handleURLUpload = () => {
    const url = prompt("Please enter the image URL");
    if (url) {
      if (isValidImageUrl(url)) {
        setImageDownscaled(url, "", 0);
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
        setImageDownscaled(reader.result, file.name, file.size);
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
    <div className="flex flex-col gap-4">
      <div
        className={`${className} p-8 bg-white rounded-3xl shadow-md flex flex-col items-center justify-center max-w-sm min-w-[290px]`}
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
        <Button
          onClick={() => fileInputRef.current?.click()}
          className="w-3/4 rounded-2xl"
          color="bg-blue-500"
          hoverColor="bg-blue-600"
        >
          Upload Image
        </Button>
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

      <div className="flex flex-col w-full text-center gap-2">
        <p className="text-sm text-gray-600">
          Don&apos;t have an image? Try these:
        </p>
        <div className="flex justify-center gap-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() =>
                setImageDownscaled(`${image}${randomNumbers[index]}.jpg`, "", 0)
              }
              className="w-16 h-16 bg-gray-300 rounded-lg relative overflow-hidden"
              style={{
                backgroundImage: `url(${image}${randomNumbers[index]}_thumbnail.jpg)`,
                backgroundSize: "cover",
              }}
            >
              <span className="absolute inset-0 bg-black opacity-0 hover:opacity-20 transition-opacity"></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
