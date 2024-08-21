"use client";

import { useUser } from "@clerk/nextjs";
import { PlanCard } from "@/components";

const Plans: React.FC = () => {
  const userPlan = "Free"; // Replace this with the actual user's plan

  const plans = [
    {
      name: "Free",
      price: "$0",
      credits: "0",
      features: [
        { label: "Standard Definition Downloads", available: true },
        { label: "High Definition Downloads", available: false },
        { label: "Ultra High Definition Downloads", available: false },
        { label: "Remove Background", available: false },
        { label: "Enhance Image Quality", available: false },
      ],
      crownColor: "text-yellow-700",
    },
    {
      name: "Silver",
      price: "$7.99",
      credits: "100",
      features: [
        { label: "Standard Definition Downloads", available: true },
        { label: "High Definition Downloads", available: true },
        { label: "Ultra High Definition Downloads", available: false },
        { label: "Remove Background", available: false },
        { label: "Enhance Image Quality", available: false },
      ],
      crownColor: "text-gray-500",
    },
    {
      name: "Gold",
      price: "$24.99",
      credits: "Unlimited",
      features: [
        { label: "Standard Definition Downloads", available: true },
        { label: "High Definition Downloads", available: true },
        { label: "Ultra High Definition Downloads", available: true },
        { label: "Remove Background", available: true },
        { label: "Enhance Image Quality", available: true },
      ],
      crownColor: "text-yellow-500",
    },
  ];

  const handleSelectPlan = (planName: string) => {
    // Handle plan change logic here
    console.log(`Changing to ${planName} plan`);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan.name}
          name={plan.name}
          price={plan.price}
          credits={plan.credits}
          features={plan.features}
          crownColor={plan.crownColor}
          isCurrentPlan={plan.name === userPlan}
          onSelect={() => handleSelectPlan(plan.name)}
        />
      ))}
    </div>
  );
};

export default Plans;
