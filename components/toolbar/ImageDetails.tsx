import { useImage } from "@/lib/contexts/ImageContext";
import { formatAspectRatio, formatSize } from "@/lib/utils";

const ImageDetails: React.FC = () => {
  const { image, imageName, width, height, imageSize } = useImage();

  const aspectRatio =
    width && height ? formatAspectRatio(width, height) : "N/A";

  return (
    <div className="flex flex-col items-center w-full border rounded-2xl p-4">
      <img
        src={typeof image === "string" ? image : ""}
        alt="Thumbnail"
        className="w-24 h-24 object-contain mb-2"
      />
      <span className="text-gray-700">{imageName || "No Image Name"}</span>
      <span className="text-gray-700">
        {width}x{height} ({formatSize(imageSize)})
      </span>
      <span className="text-gray-700">Aspect Ratio: {aspectRatio}</span>
    </div>
  );
};

export default ImageDetails;
