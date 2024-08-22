"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface PlanContextType {
  plan: string | null;
  loadingPlan: boolean;
  refreshPlanData: () => void;
  setPlan: (newPlan: string) => Promise<boolean>;
  changePlan: (newPlan: string) => Promise<boolean>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [plan, setPlanState] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<boolean>(true);

  const refreshPlanData = async () => {
    if (!user) {
      setTimeout(() => setLoadingPlan(false), 300);
      return;
    }

    try {
      setLoadingPlan(true);
      const response = await fetch("/api/mongodb", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPlanState(data.user.plan);
      } else {
        throw new Error("Failed to sync user plan with MongoDB");
      }
    } catch (error) {
      console.error("Error syncing user plan with MongoDB:", error);
    } finally {
      setTimeout(() => setLoadingPlan(false), 300);
    }
  };

  const setPlan = async (newPlan: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch("/api/mongodb/changeplan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id, newPlan }),
      });

      const data = await response.json();
      if (data.success) {
        setPlanState(newPlan);
        return true;
      } else {
        throw new Error("Failed to change plan");
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      return false;
    }
  };

  const changePlan = async (newPlan: string): Promise<boolean> => {
    if (!user) return false;

    try {
      if (newPlan.toLowerCase() === "free") {
        const planResponse = await fetch("/api/mongodb/changeplan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: user.id, newPlan }),
        });

        const planData = await planResponse.json();
        if (!planData.success) {
          throw new Error("Failed to change plan to Free");
        }

        const creditsResponse = await fetch("/api/mongodb/setcredits", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clerkId: user.id, credits: 0 }),
        });

        const creditsData = await creditsResponse.json();
        if (!creditsData.success) {
          throw new Error("Failed to set credits to 0");
        }

        setPlanState(newPlan);
        return true;
      } else {
        const response = await fetch("/api/stripe/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ planType: newPlan.toLowerCase() }),
        });

        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
          return true;
        } else {
          throw new Error("Failed to create Stripe Checkout session");
        }
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      return false;
    }
  };

  useEffect(() => {
    refreshPlanData();
  }, [user]);

  return (
    <PlanContext.Provider
      value={{ plan, loadingPlan, refreshPlanData, setPlan, changePlan }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = (): PlanContextType => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
};
