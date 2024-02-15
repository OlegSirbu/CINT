import React from "react";

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage = ({
  message,
}: ErrorMessageProps): React.ReactNode => {
  if (!message) {
    return null;
  }
  return <p className="text-red-500 pb-2 font-bold">{message}</p>;
};
