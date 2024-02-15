import React, { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...rest }: ButtonProps): ReactNode => {
  return (
    <button className="bg-[#2f64e1] p-2 rounded-md text-white" {...rest}>
      {children}
    </button>
  );
};
