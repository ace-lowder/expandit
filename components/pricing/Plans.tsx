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
    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
      {availablePlans.map((plan) => (
        <PlanCard
          key={plan.name}
          plan={plan}
          isCurrentPlan={plan.name.toLowerCase() === currentPlan?.toLowerCase()}
          onSelect={() => changePlan(plan.name)}
        />
      ))}
    </div>
  );
};

export default Plans;
