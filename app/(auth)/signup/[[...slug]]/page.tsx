"use client";

import { useEffect, useState } from "react";
import { SignUp } from "@clerk/nextjs";
import { FaSpinner } from "react-icons/fa";

const SignUpPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 5000);
  }, []);

  if (!mounted)
    return <FaSpinner className="text-gray-700 w-12 h-12 animate-spin" />;

  return <SignUp />;
};

export default SignUpPage;
