"use client";

import { useCredit } from "@/lib/contexts/CreditContext";
import { usePayment } from "@/lib/contexts/PaymentContext";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { credits, setCredits } = useCredit();
  const router = useRouter();
  const [loadingMessage, setLoadingMessage] = useState("Verifying Payment...");
  const [confirming, setConfirming] = useState(false);

  const confirmPayment = async () => {
    if (!credits || confirming) {
      return;
    }

    setConfirming(true);

    try {
      const response = await fetch(
        `/api/stripe/confirm?session_id=${sessionId}`
      );
      if (!response.ok) {
        throw new Error("Payment confirmation failed");
      }

      const data = await response.json();
      console.log("Payment confirmation successful:", data);
      setLoadingMessage("Payment confirmed!");

      await setCredits(credits + 10);
      console.log("Add credits");
      setTimeout(() => router.push("/"), 400);
    } catch (error) {
      console.error("Error during payment confirmation:", error);
      setLoadingMessage("Payment confirmation failed. Please try again.");
      router.push("/");
    }
  };

  useEffect(() => {
    if (sessionId && credits) {
      confirmPayment();
    }
  }, [sessionId, credits]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <FaSpinner
        className={`w-12 h-12 mb-4 animate-spin transition-all duration-1000 ${
          loadingMessage === "Payment confirmed!" && "opacity-0 w-0 h-0"
        } `}
      />
      <h1
        className={`text-2xl font-bold transition-all duration-1000 ${
          loadingMessage === "Payment confirmed!" &&
          "text-green-700 pb-24 text-3xl"
        } `}
      >
        {loadingMessage}
      </h1>
    </div>
  );
};

export default SuccessPage;
