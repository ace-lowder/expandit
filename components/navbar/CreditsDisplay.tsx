"use client";

import { useEffect, useState } from "react";
import { useCredit } from "@/lib/contexts/CreditContext";
import { RiCopperCoinLine } from "react-icons/ri";
import { IoIosInfinite } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";
import Link from "next/link";

const CreditsDisplay: React.FC = () => {
  const { credits } = useCredit();
  const [highlightCredits, setHighlightCredits] = useState(false);

  useEffect(() => {
    if (credits !== null) {
      setHighlightCredits(true);
      const timer = setTimeout(() => setHighlightCredits(false), 300);
      return () => clearTimeout(timer);
    }
  }, [credits]);

  return (
    <div
      className={`flex items-center gap-2 transition-all pl-3 pr-4 py-1.5 text-gray-700 rounded-lg ${
        highlightCredits ? "bg-gray-200" : "hover:bg-gray-200"
      }`}
    >
      <RiCopperCoinLine className="w-6 h-6" />{" "}
      {credits === -1 ? (
        <IoIosInfinite className="w-5 h-5" />
      ) : credits !== null ? (
        credits
      ) : (
        <FaSpinner className="animate-spin" />
      )}
    </div>
  );
};

export default CreditsDisplay;
