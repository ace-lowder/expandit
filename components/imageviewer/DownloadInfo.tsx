import { useImage } from "@/lib";

const DownloadInfo: React.FC = () => {
  const { width, height } = useImage();

  return (
    <p className="mb-2">
      {width}x{height} (Test KB)
    </p>
  );
};

export default DownloadInfo;
