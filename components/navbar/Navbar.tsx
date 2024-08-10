"use client";

import { Logo, DesktopMenu, MobileMenu } from "@/components";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-4 py-3 gap-8">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
