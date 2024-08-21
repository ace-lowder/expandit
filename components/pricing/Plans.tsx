"use client";

import { usePlan } from "@/lib";
import { PlanCard } from "@/components";

const Plans: React.FC = () => {
  const { plan: currentPlan, changePlan } = usePlan();

  const plans = [
    {
      name: "Free",
      price: "$0",
      credits: "3",
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

  const handleSelectPlan = async (planName: string) => {
    if (planName.toLowerCase() !== currentPlan?.toLowerCase()) {
      const success = await changePlan(planName);
      if (success) {
        console.log(`Successfully changed to ${planName} plan`);
      } else {
        console.error(`Failed to change to ${planName} plan`);
      }
    }
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
          isCurrentPlan={plan.name.toLowerCase() === currentPlan?.toLowerCase()}
          onSelect={() => handleSelectPlan(plan.name)}
        />
      ))}
    </div>
  );
};

export default Plans;
