"use client";

import { createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import { useCredit } from "./CreditContext";

interface PaymentContextType {
  handlePaymentSuccess: (sessionId: string) => Promise<void>;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { setCredits } = useCredit();
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

      const { plan, credits } = data;
      console.log("Setting Plan:", plan);
      console.log("Setting Credits:", credits);

      await setCredits(credits);

      router.push("/pricing");
    } catch (error) {
      console.error("Error during payment confirmation:", error);
      router.push("/pricing");
    }
  };

  return (
    <PaymentContext.Provider value={{ handlePaymentSuccess }}>
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
