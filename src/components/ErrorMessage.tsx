import React from "react";

export function ErrorMessage({ message }: { message: string }): JSX.Element {
  return <p className="text-red-500 pb-2 font-bold">{message}</p>;
}
