import { useRef, useEffect } from "react";

interface ImageUploaderProps {
  setImage: (image: string | ArrayBuffer | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ setImage }) => {
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
        setImage(reader.result);
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
          const file = item.getAsFile();
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);
          }
        } else if (item.type === "text/plain") {
          item.getAsString((url) => {
            if (isValidImageUrl(url)) {
              setImage(url);
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
        setImage(url);
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
        setImage(reader.result);
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
      className="w-1/2 p-8 bg-white rounded-lg shadow-md flex flex-col items-center"
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
