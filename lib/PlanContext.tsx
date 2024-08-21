"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface PlanContextType {
  credits: number | null;
  plan: string | null;
  loadingPlan: boolean;
  payCredits: (cost: number) => Promise<boolean>;
  refreshUserData: () => void;
  changePlan: (newPlan: string) => Promise<boolean>;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<boolean>(true);

  const refreshUserData = async () => {
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
        setCredits(data.user.credits);
        setPlan(data.user.plan);
      } else {
        throw new Error("Failed to sync user with MongoDB");
      }
    } catch (error) {
      console.error("Error syncing user with MongoDB:", error);
    } finally {
      setTimeout(() => setLoadingPlan(false), 300);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [user]);

  const payCredits = async (cost: number): Promise<boolean> => {
    if (!user || credits === null || credits < cost) return false;

    try {
      const response = await fetch("/api/mongodb/paycredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          cost,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setCredits(data.credits);
        return true;
      } else {
        throw new Error("Failed to deduct credits");
      }
    } catch (error) {
      console.error("Error deducting credits:", error);
      return false;
    }
  };

  const changePlan = async (newPlan: string): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch("/api/mongodb/changeplan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          newPlan,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPlan(data.plan);
        return true;
      } else {
        throw new Error("Failed to change plan");
      }
    } catch (error) {
      console.error("Error changing plan:", error);
      return false;
    }
  };

  return (
    <PlanContext.Provider
      value={{
        credits,
        plan,
        loadingPlan,
        payCredits,
        refreshUserData,
        changePlan,
      }}
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
