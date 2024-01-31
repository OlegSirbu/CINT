import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...rest }: ButtonProps): JSX.Element {
  return (
    <button
      type="submit"
      className="bg-[#2f64e1] p-2 rounded-md text-white"
      {...rest}
    >
      {children}
    </button>
  );
}
