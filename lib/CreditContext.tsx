"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

interface CreditContextType {
  credits: number | null;
  loadingCredits: boolean;
  refreshCreditData: () => void;
  setCredits: (newCredits: number) => Promise<boolean>;
}

const CreditContext = createContext<CreditContextType | undefined>(undefined);

export const CreditProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const [credits, setCreditsState] = useState<number | null>(null);
  const [loadingCredits, setLoadingCredits] = useState<boolean>(true);

  const refreshCreditData = async () => {
    if (!user) {
      setTimeout(() => setLoadingCredits(false), 300);
      return;
    }

    try {
      setLoadingCredits(true);
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
        setCreditsState(data.user.credits);
      } else {
        throw new Error("Failed to sync user credits with MongoDB");
      }
    } catch (error) {
      console.error("Error syncing user credits with MongoDB:", error);
    } finally {
      setTimeout(() => setLoadingCredits(false), 300);
    }
  };

  const setCredits = async (newCredits: number): Promise<boolean> => {
    if (!user) return false;

    try {
      const response = await fetch("/api/mongodb/setcredits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clerkId: user.id, credits: newCredits }),
      });

      const data = await response.json();
      if (data.success) {
        setCreditsState(newCredits);
        return true;
      } else {
        throw new Error("Failed to update credits");
      }
    } catch (error) {
      console.error("Error updating credits:", error);
      return false;
    }
  };

  useEffect(() => {
    refreshCreditData();
  }, [user]);

  return (
    <CreditContext.Provider
      value={{ credits, loadingCredits, refreshCreditData, setCredits }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = (): CreditContextType => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
};
