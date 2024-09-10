import { formatAspectRatio } from "@/lib/utils";

interface DownloadInfoProps {
  image: string | ArrayBuffer | null;
  imageName: string;
  width: number;
  height: number;
}

const DownloadInfo: React.FC<DownloadInfoProps> = ({
  image,
  imageName,
  width,
  height,
}) => {
  const aspectRatio =
    width && height ? formatAspectRatio(width, height) : "N/A";

  return (
    <div className="flex flex-col items-center w-full border rounded-2xl p-4">
      <img
        src={typeof image === "string" ? image : ""}
        alt="Thumbnail"
        className="w-48 h-auto object-contain my-4"
      />
      <span className="text-gray-700">{imageName || "Untitled"}</span>
      <span className="text-gray-700">
        {width}x{height}
      </span>
      <span className="text-gray-700">Aspect Ratio: {aspectRatio}</span>
    </div>
  );
};

export default DownloadInfo;
