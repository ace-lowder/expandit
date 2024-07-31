"use client";

import { useRouter } from "next/navigation";
import ImageUploader from "@/components/common/ImageUploader";

const HomePage = () => {
  const router = useRouter();

  const handleImageUpload = () => {
    router.push("/expand");
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-65px)] bg-white">
      <ImageUploader onImageUpload={handleImageUpload} />
    </div>
  );
};

export default HomePage;
