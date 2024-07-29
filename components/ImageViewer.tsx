import ImageUploader from "@/components/ImageUploader";

interface ImageViewerProps {
  image: string | ArrayBuffer | null;
  setImage: (image: string | ArrayBuffer | null) => void;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ image, setImage }) => {
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
        <ImageUploader setImage={setImage} />
      )}
    </div>
  );
};

export default ImageViewer;
