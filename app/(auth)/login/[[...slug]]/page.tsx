"use client";

import { useEffect, useState } from "react";
import { SignIn } from "@clerk/nextjs";
import { FaSpinner } from "react-icons/fa";

const LoginPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <FaSpinner className="animate-spin" />;

  return <SignIn />;
};

export default LoginPage;
