"use client";

import { FaCheck, FaCrown, FaCircle } from "react-icons/fa";
import { Button } from "@/components";

interface PlanCardProps {
  name: string;
  price: string;
  credits: string;
  features: { label: string; available: boolean }[];
  crownColor: string;
  isCurrentPlan: boolean;
  onSelect: () => void;
}

const PlanCard: React.FC<PlanCardProps> = ({
  name,
  price,
  credits,
  features,
  crownColor,
  isCurrentPlan,
  onSelect,
}) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-80 p-6 text-center transition-all flex flex-col gap-4 justify-between">
      <div>
        <div className="flex items-center justify-center gap-1 mt-5">
          <FaCrown className={`${crownColor} w-7 h-7 mb-1`} />
          <h2 className="text-3xl font-bold ml-2">{name}</h2>
        </div>
        <p
          className={`${
            isCurrentPlan ? "text-blue-500" : "text-white"
          } text-sm mb-1`}
        >
          {isCurrentPlan ? "Current Plan" : "-"}
        </p>
      </div>
      <hr className="mb-6" />
      <p className="text-5xl font-semibold">{price}</p>
      <p className="mb-6">
        <span className="text-blue-500 font-semibold">{credits}</span> Credits /
        Month
      </p>
      <ul className="text-left list-none space-y-2 mb-4">
        {features.map((feature, index) => (
          <li
            key={index}
            className={`flex items-center justify-start ${
              feature.available ? "text-black" : "text-gray-400"
            }`}
          >
            {feature.available ? (
              <FaCheck className="text-green-500 mr-2" />
            ) : (
              <FaCircle className="w-1.5 h-1.5 text-gray-300 ml-1 mr-4" />
            )}
            {feature.label}
          </li>
        ))}
      </ul>
      <Button
        onClick={isCurrentPlan ? () => {} : onSelect}
        disabled={isCurrentPlan}
        className={`w-full`}
        color="bg-blue-500"
        hoverColor="bg-blue-600"
      >
        {isCurrentPlan ? "Current Plan" : "Change Plan"}
      </Button>
    </div>
  );
};

export default PlanCard;
