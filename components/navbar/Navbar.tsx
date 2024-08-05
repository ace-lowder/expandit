"use client";

import Link from "next/link";
import Image from "next/image";
import logo from "@/public/logo.svg";
import { menuItems, renderMenuItem } from "@/constants/menuItems";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-4 py-3 gap-8">
      {/* Logo and App Name */}
      <Link href="/" className="flex items-center space-x-3">
        <Image src={logo} alt="Expandit Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-gray-900 mt-[2px]">
          Expandit
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex flex-grow items-center justify-between">
        {/* Left Menu */}
        <div className="flex flex-grow items-center gap-4">
          {menuItems
            .filter(({ position }) => position === "left")
            .map(renderMenuItem)}
        </div>

        {/* Right Menu */}
        <div className="flex items-center gap-4">
          {menuItems
            .filter(({ position }) => position === "right")
            .map(renderMenuItem)}
        </div>
      </div>

      {/* Mobile Navbar */}
      <MobileNavbar />
    </nav>
  );
};

export default Navbar;
