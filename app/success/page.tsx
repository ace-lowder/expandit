"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePlan } from "@/lib";
import { FaSpinner } from "react-icons/fa";

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { refreshUserData } = usePlan();
  const router = useRouter();
  const [loadingMessage, setLoadingMessage] = useState("Verifying Payment...");

  useEffect(() => {
    const confirmPayment = async () => {
      if (sessionId) {
        try {
          const response = await fetch(
            "/api/stripe/confirm?session_id=" + sessionId
          );
          if (!response.ok) {
            throw new Error("Payment confirmation failed");
          }
          const data = await response.json();
          console.log("Payment confirmation successful:", data);

          setLoadingMessage("Payment Successful: Redirecting...");

          await refreshUserData();

          // Adding a brief delay to ensure user data is updated
          setTimeout(() => {
            router.push("/pricing");
          }, 500); // 500ms delay to allow user data to refresh
        } catch (error: any) {
          console.error("Payment confirmation failed:", error.message);
          router.push("/pricing");
        }
      }
    };

    confirmPayment();
  }, [sessionId, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <FaSpinner className="w-12 h-12 mb-4 animate-spin" />
      <h1 className="text-2xl font-bold">{loadingMessage}</h1>
    </div>
  );
};

export default SuccessPage;
