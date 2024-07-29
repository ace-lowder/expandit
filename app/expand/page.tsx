"use client";

import { useState } from "react";
import Toolbar from "@/components/Toolbar";
import ImageViewer from "@/components/ImageViewer";

const ExpandPage = () => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  return (
    <div className="flex h-[calc(100vh-65px)]">
      <Toolbar />
      <ImageViewer image={image} setImage={setImage} />
    </div>
  );
};

export default ExpandPage;
