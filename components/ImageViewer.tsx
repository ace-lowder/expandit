import ImageUploader from "@/components/ImageUploader";
import { useImage } from "@/context/ImageContext";

const ImageViewer: React.FC = () => {
  const { image } = useImage();

  return (
    <div className="w-3/4 bg-gray-100 p-4 flex justify-center items-center">
      {image ? (
        <div className="relative max-w-full h-auto">
          <img
            src={typeof image === "string" ? image : ""}
            alt="Uploaded"
            className="max-w-full h-auto"
          />
        </div>
      ) : (
        <ImageUploader />
      )}
    </div>
  );
};

export default ImageViewer;
