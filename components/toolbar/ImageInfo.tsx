import { useImage } from "@/context/ImageContext";

const ImageInfo: React.FC = () => {
  const { image, imageName, width, height, imageSize } = useImage();

  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  const formatAspectRatio = (width: number, height: number) => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(width, height);
    return `${width / divisor}:${height / divisor}`;
  };

  const aspectRatio =
    width && height ? formatAspectRatio(width, height) : "N/A";

  return (
    <div className="flex flex-col items-center w-full mb-4">
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

export default ImageInfo;
