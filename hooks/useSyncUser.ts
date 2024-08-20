"use client";

import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const useSyncUser = () => {
  const { user } = useUser();

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

        if (!response.ok) {
          throw new Error("Failed to sync user with MongoDB");
        }
      } catch (error) {
        console.error("Error syncing user with MongoDB:", error);
      }
    };

    syncUser();
  }, [user]);
};

export default useSyncUser;
