"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from "@/public/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Menu items for desktop and mobile
  const menuItems = [
    { href: "/expand", label: "Expand", position: "left" },
    { href: "/pricing", label: "Pricing", position: "left" },
    { href: "/login", label: "Log In", position: "right" },
    { href: "/signup", label: "Sign Up", position: "right", button: true },
  ];

  const renderMenuItem = ({
    href,
    label,
    button,
  }: {
    href: string;
    label: string;
    button?: boolean;
  }) => {
    return button ? (
      <Link
        key={href}
        href={href}
        className="bg-gray-300 text-gray-700 hover:bg-gray-400 transition duration-300 px-6 py-2 rounded-full"
      >
        {label}
      </Link>
    ) : (
      <Link
        key={href}
        href={href}
        className="text-gray-700 hover:bg-gray-200 transition duration-300 px-3 py-1 rounded"
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-4 py-3 gap-8">
      {/* Logo and App Name */}
      <Link href="/" className="flex items-center space-x-4">
        <Image src={logo} alt="Expandit Logo" width={40} height={40} />
        <span className="text-2xl font-bold text-gray-900">Expandit</span>
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

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bars3Icon className="w-6 h-6" />
      </button>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-white z-50 transition-transform transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-4 text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(false)}
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-6 mt-32">
          {menuItems.map(renderMenuItem)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
