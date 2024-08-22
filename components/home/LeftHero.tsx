"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components";

const LeftHero = () => {
  const [isShimmering, setIsShimmering] = useState(true);
  const [isWiping, setIsWiping] = useState(false);

  useEffect(() => {
    const shimmerTimeout = setTimeout(() => {
      setIsShimmering(false);
      setIsWiping(true);
    }, 500);

    return () => {
      clearTimeout(shimmerTimeout);
    };
  }, []);

  return (
    <div className="flex flex-col items-center lg:items-start justify-center max-w-96 gap-4">
      <div className="w-full h-[500px] flex justify-center items-center relative">
        {/* Shimmer Effect */}
        {isShimmering && (
          <div
            className={`absolute z-10 w-full h-full ${
              isShimmering ? "fade-in" : "fade-out"
            }`}
          >
            <div className="shimmer" />
          </div>
        )}

        {/* Checkerboard */}
        <div className="absolute checkerboard transition-all w-full h-full" />

        {/* Generated Image */}
        {isWiping && (
          <img
            src="/hero/hero-expanded.png"
            alt="Hero Expanded Image"
            className="absolute pointer-events-none wipe-in w-full h-full"
          />
        )}

        {/* Original Image */}
        <img
          src="/hero/hero.png"
          alt="Hero Image"
          className={`z-20 transition-all w-96 h-96 ${
            isWiping ? "fade-out-delay" : ""
          }`}
        />
      </div>
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
