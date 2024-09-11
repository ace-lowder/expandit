"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useCredit } from "./CreditContext";
import { useUser } from "@clerk/nextjs";

interface PaymentContextType {
  handlePaymentSuccess: (sessionId: string) => Promise<void>;
  checkout: () => Promise<boolean>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { credits, setCredits } = useCredit();
  const router = useRouter();

  const handlePaymentSuccess = async (sessionId: string) => {
    try {
      const response = await fetch(
        `/api/stripe/confirm?session_id=${sessionId}`
      );
      if (!response.ok) {
        throw new Error("Payment confirmation failed");
      }

      const data = await response.json();

      console.log("Payment confirmation successful:", data);
      console.log("Adding Credits");

      await setCredits(credits ? credits + 5 : 100);

      console.log("Credits added");
      router.push("/");
    } catch (error) {
      console.error("Error during payment confirmation:", error);
      router.push("/");
    }
  };

  const checkout = async () => {
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
        return true;
      } else {
        throw new Error("Failed to create Stripe Checkout session");
      }
    } catch (error) {
      console.error("Error checking out:", error);
      return false;
    }
  };

  return (
    <PaymentContext.Provider value={{ handlePaymentSuccess, checkout }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = (): PaymentContextType => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
