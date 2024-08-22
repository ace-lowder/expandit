"use client";

import { useRouter } from "next/navigation";
import { ImageUploader } from "@/components";
import { useImage } from "@/lib";

const imageList = [
  {
    url: "https://plus.unsplash.com/premium_photo-1724071103563-20412ad6bfa1?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://plus.unsplash.com/premium_photo-1686090450479-370d5ddf4de1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1724026403614-f5461d17c6cc?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    url: "https://images.unsplash.com/photo-1723883973654-474fd909d3b7?q=80&w=1970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const RightHero = () => {
  const { setImage } = useImage();
  const router = useRouter();

  const handleImageSelect = (url: string) => {
    setImage(url, "", 0);
    router.push("/editor");
  };

  return (
    <div className="flex flex-col items-center lg:items-start justify-center min-w-80 lg:min-w-96 gap-4">
      <div className="w-full max-w-lg">
        <ImageUploader
          className="h-72"
          onImageUpload={() => router.push("/editor")}
        />
      </div>
      <div className="flex flex-col w-full text-center gap-2">
        <p className="text-sm text-gray-500">
          Don&apos;t have an image? Try these:
        </p>
        <div className="flex justify-center gap-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => handleImageSelect(image.url)}
              className="w-16 h-16 bg-gray-300 rounded-lg relative overflow-hidden"
              style={{
                backgroundImage: `url(${image.url})`,
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

export default RightHero;
