"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const useSyncUser = () => {
  const { user } = useUser();
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    const syncUser = async () => {
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

    syncUser();
  }, [user]);

  return credits;
};

export default useSyncUser;
