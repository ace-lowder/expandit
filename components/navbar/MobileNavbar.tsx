"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { menuItems, renderMenuItem } from "@/lib";

const MobileNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-700 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="w-6 h-6" />
      </button>

      {/* Mobile Navbar */}
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
          <FaTimes className="w-6 h-6" />
        </button>

        {/* Menu Items */}
        <div className="flex flex-col items-center space-y-6 mt-32">
          {renderMenuItem({
            href: "/",
            label: "Home",
            onClick: () => setIsOpen(false),
          })}
          {menuItems.map((item) =>
            renderMenuItem({ ...item, onClick: () => setIsOpen(false) })
          )}
        </div>
      </div>
    </>
  );
};

export default MobileNavbar;
