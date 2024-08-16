"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { FaBars, FaTimes } from "react-icons/fa";
import { MenuButton, RoundedMenuButton, IconButton } from "@/components";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <IconButton
        className="md:hidden"
        icon={<FaBars className="w-6 h-6" />}
        onClick={() => setIsOpen(true)}
      />

      <div
        className={`bg-white md:hidden shadow-lg fixed w-96 h-full z-50 right-0 top-0 transition-all ${
          isOpen ? "-translate-x-0" : "translate-x-full"
        }`}
      >
        <IconButton
          className="absolute top-5 right-4"
          icon={<FaTimes className="w-6 h-6" />}
          onClick={closeMenu}
        />

        <div className="flex flex-col h-full items-start justify-between px-4 py-4">
          <div className="flex flex-col text-left gap-2 mt-16 w-full">
            <MenuButton label="Home" href="/" onClick={closeMenu} />
            <MenuButton label="Expand" href="/expand" onClick={closeMenu} />
            <MenuButton label="Pricing" href="/pricing" onClick={closeMenu} />
          </div>
          <div className="flex flex-col gap-4 text-center w-full">
            {isSignedIn ? (
              <div className="flex items-center gap-4">
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: {
                        width: "36px",
                        height: "36px",
                      },
                      userButtonAvatarImage: {
                        width: "36px",
                        height: "36px",
                      },
                    },
                  }}
                />
                <span className="text-gray-700 text-lg font-medium">
                  {user?.fullName || user?.username}
                </span>
              </div>
            ) : (
              <>
                <RoundedMenuButton
                  label="Log In"
                  href="/login"
                  onClick={closeMenu}
                />
                <RoundedMenuButton
                  label="Sign Up"
                  href="/signup"
                  outline
                  onClick={closeMenu}
                />
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed w-full h-full top-0 left-0 z-40 bg-black transition-opacity transition duration-500 ${
          isOpen ? "opacity-20 block" : "opacity-0 hidden"
        }`}
        onClick={closeMenu}
      />
    </>
  );
};

export default MobileMenu;
