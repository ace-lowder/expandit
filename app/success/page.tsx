"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { usePayment } from "@/lib";

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { handlePaymentSuccess } = usePayment();
  const [loadingMessage, setLoadingMessage] = useState("Verifying Payment...");

  useEffect(() => {
    if (sessionId) {
      handlePaymentSuccess(sessionId);
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <FaSpinner className="w-12 h-12 mb-4 animate-spin" />
      <h1 className="text-2xl font-bold">{loadingMessage}</h1>
    </div>
  );
};

export default SuccessPage;
