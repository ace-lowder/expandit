"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface CreditsContextType {
  credits: number | null;
  payCredits: (cost: number) => Promise<boolean>;
  refreshCredits: () => void;
}

const CreditsContext = createContext<CreditsContextType | undefined>(undefined);

export const CreditsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  const refreshCredits = async () => {
    if (!user) return;

    try {
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
      } else {
        throw new Error("Failed to sync user with MongoDB");
      }
    } catch (error) {
      console.error("Error syncing user with MongoDB:", error);
    }
  };

  useEffect(() => {
    refreshCredits();
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

  return (
    <CreditsContext.Provider value={{ credits, payCredits, refreshCredits }}>
      {children}
    </CreditsContext.Provider>
  );
};

export const useCredits = (): CreditsContextType => {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits must be used within a CreditsProvider");
  }
  return context;
};
