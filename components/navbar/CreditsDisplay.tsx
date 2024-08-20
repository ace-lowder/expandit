"use client";

import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { RiCopperCoinLine } from "react-icons/ri";
import { useCredits } from "@/lib";
import Link from "next/link";

const CreditsDisplay: React.FC = () => {
  const { credits } = useCredits();
  const [highlightCredits, setHighlightCredits] = useState(false);

  useEffect(() => {
    if (credits !== null) {
      setHighlightCredits(true);
      const timer = setTimeout(() => setHighlightCredits(false), 300);
      return () => clearTimeout(timer);
    }
  }, [credits]);

  return (
    <Link
      className={`flex items-center gap-2 transition-all pl-3 pr-4 py-1.5 text-gray-700 rounded-lg ${
        highlightCredits ? "bg-gray-200" : "hover:bg-gray-200"
      }`}
      href="/pricing"
    >
      <RiCopperCoinLine className="w-6 h-6" />{" "}
      {credits !== null ? credits : <FaSpinner className="animate-spin" />}
    </Link>
  );
};

export default CreditsDisplay;
