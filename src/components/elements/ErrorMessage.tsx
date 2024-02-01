import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return <p className="text-red-500 pb-2 font-bold">{message}</p>;
};
