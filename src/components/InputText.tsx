import React from "react";
import { useController, Control } from "react-hook-form";

interface InputTextControllerProps {
  name: "field";
  control: Control<{ field: string }>;
}

export function InputText(props: InputTextControllerProps): JSX.Element {
  const { field } = useController(props);
  return (
    <input
      type="text"
      value={field.value}
      onChange={(e) => field.onChange(e.target.value)}
      className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-4"
    />
  );
}
