import { LeftHero, RightHero } from "@/components";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center max-w-6xl mx-auto min-h-[90vh] gap-12 lg:gap-20 py-24 px-4">
      <LeftHero />
      <RightHero />
    </div>
  );
};

export default Hero;
