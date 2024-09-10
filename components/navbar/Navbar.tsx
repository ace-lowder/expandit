"use client";

import useSyncUser from "@/hooks/useSyncUser";
import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

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
