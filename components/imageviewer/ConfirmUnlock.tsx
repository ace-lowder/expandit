"use client";

import { useRouter } from "next/navigation";
import { useError } from "@/lib/contexts/ErrorContext";
import { useCredit } from "@/lib/contexts/CreditContext";
import { useHistory } from "@/lib/contexts/HistoryContext";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import Button from "../common/Button";
import Header from "../common/Header";

interface ConfirmUnlockProps {
  quality: string;
  onConfirm: () => void;
  onCancel: () => void;
  visible: boolean;
}

const ConfirmUnlock: React.FC<ConfirmUnlockProps> = ({
  quality,
  onConfirm,
  onCancel,
  visible,
}) => {
  const router = useRouter();
  const { showError } = useError();
  const { credits, payCredits } = useCredit();
  const { saveImage } = useHistory();
  const cost = quality === "HD" ? 1 : 2;

  const handleConfirm = async () => {
    const success = await payCredits(cost);
    if (success) {
      onConfirm();
    } else {
      showError("Failed to unlock image. Please try again.");
    }
  };

  if (!visible) return null;

  const handleLogin = () => {
    saveImage();
    router.push("/login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="flex flex-col gap-3 bg-white rounded-xl p-4 shadow-lg w-96">
        <div className="flex justify-between items-center">
          <Header>Confirm Unlock</Header>
          <Button
            className="hover:text-gray-500"
            icon={<FaTimes className="w-4 h-4" />}
            onClick={onCancel}
            variant="icon"
          />
        </div>
        {credits !== null && credits >= cost ? (
          <>
            <p className="mb-4">
              Once you unlock the {quality} quality version of this image, you
              will be able to download it.
            </p>
            <div className="flex gap-2">
              <Button
                onClick={handleConfirm}
                className="flex-grow"
                color="bg-blue-500"
                hoverColor="bg-blue-600"
              >
                <RiCopperCoinLine className="w-5 h-5" />
                {`Use ${cost} ${cost > 1 ? "Credits" : "Credit"}`}
              </Button>
              <Button
                onClick={onCancel}
                color="bg-gray-400"
                hoverColor="bg-gray-500"
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mb-4">
              <span className="text-red-600">
                You need to log in to unlock high quality images.
              </span>{" "}
              Please log into your account using the buttons below.
            </p>

            <div className="flex gap-4">
              <Button
                onClick={() => {
                  saveImage();
                  router.push("/login");
                }}
                className="w-full rounded-full"
                color="bg-gray-700"
                hoverColor="bg-gray-500"
              >
                Log In
              </Button>
              <Button
                onClick={() => {
                  saveImage();
                  router.push("/signup");
                }}
                className="w-full rounded-full border border-gray-300 !text-gray-700"
                color="bg-white"
                hoverColor="bg-gray-100"
              >
                Sign Up
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmUnlock;
