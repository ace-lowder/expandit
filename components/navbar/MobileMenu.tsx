"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { FaBars, FaSpinner, FaTimes } from "react-icons/fa";
import { Button, MenuButton, CreditsDisplay, PlanDisplay } from "@/components";
import { usePlan } from "@/lib";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { loadingPlan } = usePlan();

  const userButtonSize = 36;

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Editor", href: "/editor" },
    { label: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <Button
        className="md:hidden"
        icon={<FaBars className="w-6 h-6" />}
        onClick={() => setIsOpen(true)}
        variant="icon"
      />

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-20 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg z-50 transition-transform">
            <Button
              className="absolute top-[13px] right-4"
              icon={<FaTimes className="w-6 h-6" />}
              onClick={() => setIsOpen(false)}
              variant="icon"
            />
            <div className="flex flex-col h-full px-4 py-4">
              <div className="mt-16 flex flex-col gap-2">
                {menuItems.map((item) => (
                  <MenuButton
                    key={item.label}
                    {...item}
                    onClick={() => setIsOpen(false)}
                  />
                ))}
              </div>
              <div className="mt-auto flex flex-col items-start gap-4">
                {loadingPlan ? (
                  <FaSpinner className="animate-spin text-gray-500" />
                ) : isSignedIn ? (
                  <>
                    <PlanDisplay />
                    <div className="flex justify-between items-center w-full">
                      <div className="flex items-center gap-3 text-gray-700 font-semibold text-lg ml-1.5">
                        <UserButton
                          appearance={{
                            elements: {
                              userButtonAvatarBox: {
                                width: `${userButtonSize}px`,
                                height: `${userButtonSize}px`,
                              },
                              userButtonAvatarImage: {
                                width: `${userButtonSize}px`,
                                height: `${userButtonSize}px`,
                              },
                            },
                          }}
                        />
                        <span className="cursor-default">{user.fullName}</span>
                      </div>
                      <CreditsDisplay />
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4 w-full">
                    <MenuButton
                      label="Log In"
                      href="/login"
                      fill
                      rounded
                      onClick={() => setIsOpen(false)}
                    />
                    <MenuButton
                      label="Sign Up"
                      href="/signup"
                      outline
                      rounded
                      onClick={() => setIsOpen(false)}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
