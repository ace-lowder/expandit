"use client";

import { usePlan } from "@/lib";
import { FaCheck, FaCrown, FaSpinner } from "react-icons/fa";
import { Button } from "@/components";

interface PlanCardProps {
  plan: {
    name: string;
    price: string;
    credits: string;
    features: string[];
    available: boolean[];
    crownColor: string;
  };
  isCurrentPlan: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  plan,
  isCurrentPlan,
  onSelect,
}) => {
  const { loadingPlan } = usePlan();

  return (
    <div className="bg-white shadow-md rounded-lg w-80 p-6 text-center transition-all flex flex-col gap-4 justify-between">
      <div>
        <div className="flex items-center justify-center gap-1 mt-5">
          <FaCrown className={`${plan.crownColor} w-7 h-7 mb-1`} />
          <h2 className="text-3xl font-bold ml-2">{plan.name}</h2>
        </div>
        {isCurrentPlan && (
          <p className="text-blue-500 text-sm mb-1">Current Plan</p>
        )}
      </div>
      <hr className="mb-6" />
      <p className="text-5xl font-semibold">{plan.price}</p>
      <p className="mb-6">
        <span className="text-blue-500 font-semibold">{plan.credits}</span>{" "}
        Credits / Month
      </p>
      <ul className="text-left list-none space-y-2 mb-4">
        {plan.features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center ${
              plan.available[index] ? "text-black" : "text-gray-400"
            }`}
          >
            {plan.available[index] ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : (
              <span className="w-1.5 h-1.5 text-gray-300 ml-1 mr-4" />
            )}
            {feature}
          </li>
        ))}
      </ul>
      <Button
        onClick={isCurrentPlan || loadingPlan ? () => {} : onSelect}
        disabled={isCurrentPlan || loadingPlan}
        className="w-full"
        color="bg-blue-500"
        hoverColor="bg-blue-600"
      >
        {loadingPlan ? (
          <FaSpinner className="animate-spin mx-auto my-1" />
        ) : isCurrentPlan ? (
          "Current Plan"
        ) : (
          "Change Plan"
        )}
      </Button>
    </div>
  );
};

export default PlanCard;
