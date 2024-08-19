"use client";

import { Logo, DesktopMenu, MobileMenu } from "@/components";
import { useSyncUser } from "@/hooks";

const Navbar: React.FC = () => {
  useSyncUser();
  return (
    <nav className="bg-white shadow-md border-b border-gray-100 flex items-center justify-between px-4 py-3 gap-8 w-full">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </nav>
  );
};

export default Navbar;
