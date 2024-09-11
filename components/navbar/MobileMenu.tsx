"use client";

import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { useCredit } from "@/lib/contexts/CreditContext";
import { usePayment } from "@/lib/contexts/PaymentContext";
import { FaBars, FaSpinner, FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import MenuButton from "../common/MenuButton";
import CreditsDisplay from "./CreditsDisplay";

const MobileMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const { credits, setCredits } = useCredit();
  const { checkout } = usePayment();

  const userButtonSize = 36;

  return (
    <>
      <div className="rounded px-2 p-1 bg-yellow-500 text-xs text-white font-bold mr-auto md:hidden">
        DEMO
      </div>

      <Button
        className="md:hidden"
        icon={<FaBars className="w-6 h-6" />}
        onClick={() => setIsOpen(true)}
        variant="icon"
      />

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-20 z-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-lg z-[60] transition-transform">
            <Button
              className="absolute top-[13px] right-4"
              icon={<FaTimes className="w-6 h-6" />}
              onClick={() => setIsOpen(false)}
              variant="icon"
            />
            <div className="flex flex-col h-full px-4 py-4">
              {isSignedIn ? (
                <div className="mt-16 flex flex-col gap-2">
                  <Button
                    onClick={() => checkout()}
                    color="bg-blue-500"
                    hoverColor="bg-blue-600"
                    className="text-sm w-full"
                  >
                    Buy Credits
                  </Button>
                  <Button
                    onClick={() => setCredits(credits ? credits + 5 : 100)}
                    color="bg-gray-400"
                    hoverColor="bg-gray-500"
                    className="text-sm w-full"
                  >
                    Add Credits
                  </Button>
                </div>
              ) : null}
              <div className="mt-auto flex flex-col items-start gap-4">
                {!isLoaded ? (
                  <FaSpinner className="animate-spin text-gray-500" />
                ) : isSignedIn ? (
                  <>
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
