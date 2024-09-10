"use client";

import ErrorMessage from "@/components/common/ErrorMessage";
import { createContext, useState, useContext, ReactNode } from "react";

interface ErrorContextProps {
  showError: (message: string) => void;
}

const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useError = (): ErrorContextProps => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface Error {
  id: number;
  message: string;
}

export const ErrorProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [errors, setErrors] = useState<Error[]>([]);

  const showError = (message: string) => {
    const id = Date.now();
    setErrors((prevErrors) => [...prevErrors, { id, message }]);

    // Remove the error after 3 seconds
    setTimeout(() => {
      setErrors((prevErrors) => prevErrors.filter((error) => error.id !== id));
    }, 3000);
  };

  return (
    <ErrorContext.Provider value={{ showError }}>
      {children}
      {errors.map((error, index) => (
        <ErrorMessage
          key={error.id}
          message={error.message}
          show={true}
          index={index}
        />
      ))}
    </ErrorContext.Provider>
  );
};
