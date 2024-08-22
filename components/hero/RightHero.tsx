import { ImageUploader } from "@/components";

const RightHero = () => {
  return (
    <div className="flex flex-col items-center lg:items-start justify-center min-w-96 gap-4">
      <div className="w-full max-w-lg">
        <ImageUploader className="h-72" onImageUpload={() => {}} />{" "}
        {/* Larger ImageUploader */}
      </div>
      <div className="flex flex-col w-full text-center gap-2">
        <p className="text-sm text-gray-500">
          Don&apos;t have an image? Try these:
        </p>
        <div className="flex justify-center gap-2">
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>{" "}
          {/* Placeholder for image button 1 */}
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>{" "}
          {/* Placeholder for image button 2 */}
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>{" "}
          {/* Placeholder for image button 3 */}
          <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>{" "}
          {/* Placeholder for image button 4 */}
        </div>
      </div>
    </div>
  );
};

export default RightHero;
