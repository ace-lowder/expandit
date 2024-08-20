"use client";

import { RiCopperCoinLine } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import Header from "../common/Header";
import Button from "../common/Button";

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
  const cost = quality === "HD" ? 1 : 2;

  if (!visible) return null;

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
        <p className="mb-4">
          Once you unlock the {quality} quality version of this image, you will
          be able to download it.
        </p>
        <div className="flex gap-2">
          <Button
            onClick={onConfirm}
            className="flex-grow"
            color="bg-blue-500"
            hoverColor="bg-blue-600"
          >
            <RiCopperCoinLine className="w-5 h-5" />
            {`Use ${cost} ${cost > 1 ? "Credits" : "Credit"} `}
          </Button>
          <Button
            onClick={onCancel}
            color="bg-gray-400"
            hoverColor="bg-gray-500"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUnlock;
