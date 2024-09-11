"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import MenuButton from "../common/MenuButton";
import CreditsDisplay from "./CreditsDisplay";
import Button from "../common/Button";
import { useCredit } from "@/lib/contexts/CreditContext";
import { usePayment } from "@/lib/contexts/PaymentContext";
import { FaSpinner } from "react-icons/fa";

const DesktopMenu: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const { credits, setCredits } = useCredit();
  const { checkout } = usePayment();

  return (
    <div className="hidden md:flex justify-between flex-grow items-center">
      <div className="rounded px-2 p-1 bg-yellow-500 text-xs text-white font-bold">
        DEMO
      </div>

      {!isLoaded ? (
        <FaSpinner className="animate-spin text-gray-500" />
      ) : isSignedIn ? (
        <div className="flex items-center">
          <Button
            onClick={() => checkout()}
            color="bg-blue-500"
            hoverColor="bg-blue-600"
            className="text-sm mr-2"
          >
            Buy Credits
          </Button>
          <Button
            onClick={() => setCredits(credits ? credits + 5 : 100)}
            color="bg-gray-400"
            hoverColor="bg-gray-500"
            className="text-sm mr-2"
          >
            Add Credits
          </Button>
          <CreditsDisplay />
          <div className="w-2" />
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: { width: "36px", height: "36px" },
                userButtonAvatarImage: { width: "36px", height: "36px" },
              },
            }}
          />
        </div>
      ) : (
        <div className="flex gap-4">
          <MenuButton label="Log In" href="/login" fill rounded />
          <MenuButton label="Sign Up" href="/signup" rounded outline />
        </div>
      )}
    </div>
  );
};

export default DesktopMenu;
