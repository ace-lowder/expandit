"use client";

import { useRouter } from "next/navigation";
import { useError, useCredit } from "@/lib";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import { Header, Button } from "@/components";

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

  const handleViewPlans = () => {
    router.push("/pricing");
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
                You don&apos;t have enough credits.
              </span>{" "}
              Please upgrade your plan to earn more credits.
            </p>

            <Button
              onClick={handleViewPlans}
              className="w-full"
              color="bg-blue-500"
              hoverColor="bg-blue-600"
            >
              View Plans
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmUnlock;
