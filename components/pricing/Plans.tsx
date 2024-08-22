"use client";

import { usePlan } from "@/lib";
import { PlanCard } from "@/components";

const Plans: React.FC = () => {
  const { plan: currentPlan, refreshUserData } = usePlan();
  refreshUserData();

  const plans = [
    {
      name: "Free",
      price: "$0",
      credits: "3",
      features: [
        "Standard Definition Downloads",
        "High Definition Downloads",
        "Ultra High Definition Downloads",
        "Remove Background",
        "Enhance Image Quality",
      ],
      available: [true, false, false, false, false],
      crownColor: "text-yellow-700",
    },
    {
      name: "Silver",
      price: "$7.99",
      credits: "100",
      features: [
        "Standard Definition Downloads",
        "High Definition Downloads",
        "Ultra High Definition Downloads",
        "Remove Background",
        "Enhance Image Quality",
      ],
      available: [true, true, false, false, false],
      crownColor: "text-gray-500",
    },
    {
      name: "Gold",
      price: "$24.99",
      credits: "Unlimited",
      features: [
        "Standard Definition Downloads",
        "High Definition Downloads",
        "Ultra High Definition Downloads",
        "Remove Background",
        "Enhance Image Quality",
      ],
      available: [true, true, true, true, true],
      crownColor: "text-yellow-500",
    },
  ];

  const handleSelectPlan = async (planName: string) => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType: planName.toLowerCase() }),
      });
      const data = await response.json();
      if (data.url) window.location.href = data.url;
      else
        console.error("Failed to create Stripe Checkout session:", data.error);
    } catch (error) {
      console.error("Error during Stripe Checkout:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      {plans.map((plan) => (
        <PlanCard
          key={plan.name}
          plan={plan}
          isCurrentPlan={plan.name.toLowerCase() === currentPlan?.toLowerCase()}
          onSelect={() => handleSelectPlan(plan.name)}
        />
      ))}
    </div>
  );
};

export default Plans;
