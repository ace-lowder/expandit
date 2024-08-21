"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePlan } from "@/lib";

const SuccessPage: React.FC = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { refreshUserData } = usePlan();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/stripe/confirm?session_id=${sessionId}`)
        .then((res) => res.json())
        .then(async (data) => {
          if (data.success) {
            await refreshUserData(); // Refresh the user data to reflect the new plan
            setLoading(false);
          } else {
            console.error("Payment confirmation failed:", data.error);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.error("Error confirming payment:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p>Your plan has been updated.</p>
      <button
        onClick={() => router.push("/")}
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default SuccessPage;
