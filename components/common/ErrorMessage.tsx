"use client";

import { useEffect, useState } from "react";

interface ErrorMessageProps {
  message: string;
  show: boolean;
  index: number; // To determine the position of the message
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  show,
  index,
}) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) {
      // Trigger fade-out after 2.5 seconds (0.5s before hiding)
      setTimeout(() => setFade(true), 2500);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      className={`fixed left-1/2 transform -translate-x-1/2 bg-red-600 text-white py-2 px-4 rounded shadow-lg transition-all duration-500 ${
        fade ? "opacity-0" : "opacity-100"
      }`}
      style={{
        bottom: `${index * 60 + 20}px`, // Adjust position based on index
        zIndex: 1000,
      }}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
