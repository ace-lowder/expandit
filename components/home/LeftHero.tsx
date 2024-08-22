import { Header } from "@/components";

const LeftHero = () => {
  return (
    <div className="flex flex-col items-center lg:items-start justify-center max-w-96 gap-4">
      <div className="w-full h-[500px] bg-gray-300" />
      <Header className="text-center lg:text-left text-6xl" size="6xl">
        Expand Your Perspective
      </Header>
      <p className="text-2xl text-blue-500 font-semibold text-center lg:text-left">
        100% Free and Private
      </p>
    </div>
  );
};

export default LeftHero;
