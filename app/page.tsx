"use client";

import { Hero, Examples } from "@/components";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gray-200">
      <Hero />
      <Examples />
    </div>
  );
};

export default HomePage;
