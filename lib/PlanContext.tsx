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
  availablePlans: Plan[];
}

interface Plan {
  name: string;
  price: string;
  credits: string;
  features: string[];
  available: boolean[];
  crownColor: string;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export const PlanProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);
  const [plan, setPlan] = useState<string | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<boolean>(true);

  const availablePlans: Plan[] = [
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
    } catch (error) {
      console.error("Error during Stripe Checkout:", error);
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
        availablePlans,
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
