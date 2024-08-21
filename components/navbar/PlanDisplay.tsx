"use client";

import { usePlan } from "@/lib";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { FaCrown } from "react-icons/fa";

type PlanType = "free" | "silver" | "gold";

const planConfig: Record<PlanType, { color: string; name: string }> = {
  free: { color: "text-yellow-700", name: "Free" },
  silver: { color: "text-gray-500", name: "Silver" },
  gold: { color: "text-yellow-500", name: "Gold" },
};

const PlanDisplay: React.FC = () => {
  const { plan } = usePlan();

  const normalizedPlan = (plan?.toLowerCase() as PlanType) || "free";
  const currentPlan = planConfig[normalizedPlan];

  return (
    <Link
      className="flex items-center gap-2 transition-all pl-3 pr-4 py-1.5 text-gray-700 rounded-lg hover:bg-gray-200"
      href="/pricing"
    >
      <FaCrown
        className={`w-6 h-6 mb-0.5 ${currentPlan.color || "text-gray-300"}`}
      />
      {plan ? (
        <span className="text-sm font-semibold">{currentPlan.name}</span>
      ) : (
        <FaSpinner className="animate-spin" />
      )}
    </Link>
  );
};

export default PlanDisplay;
