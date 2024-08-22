"use client";

import { useEffect } from "react";
import { usePlan, availablePlans } from "@/lib";
import { PlanCard } from "@/components";

const Plans: React.FC = () => {
  const { plan: currentPlan, changePlan, refreshPlanData } = usePlan();

  useEffect(() => {
    refreshPlanData();
  }, []);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        {availablePlans.map((plan) => (
          <PlanCard
            key={plan.name}
            plan={plan}
            isCurrentPlan={
              plan.name.toLowerCase() === currentPlan?.toLowerCase()
            }
            onSelect={() => changePlan(plan.name)}
          />
        ))}
      </div>
      <div className="text-lg flex flex-col gap-2 text-center">
        <p>*None of the plans cost real money</p>
        <p>
          Use the{" "}
          <span className="text-blue-500 font-semibold">
            development card 4242 4242 4242 4242
          </span>{" "}
          to process your payment.
        </p>
      </div>
    </div>
  );
};

export default Plans;
