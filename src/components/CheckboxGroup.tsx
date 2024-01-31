import React, { useState } from "react";
import { useController, Control } from "react-hook-form";

export interface CheckboxesProps {
  name: "answers";
  control: Control<{ answers: string[] }>;
  options: Array<string>;
}

export function CheckboxGroup({
  options,
  name,
  control,
}: CheckboxesProps): JSX.Element {
  const { field } = useController({ name, control });
  const [value, setValue] = useState<Array<string | boolean>>(
    Array.isArray(field.value) ? field.value : []
  );

  function handleChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const valueCopy = [...value];
    //TODO simplify
    valueCopy[index] = e.target?.checked ? e.target?.value : false;
    field.onChange(valueCopy);
    setValue(valueCopy);
  }

  return (
    <div className="flex flex-col my-4">
      {options.map((option, index) => (
        <label className="pr-4 cursor-pointer" key={option}>
          <input
            onChange={(e) => handleChange(e, index)}
            checked={value.includes(option)}
            type="checkbox"
            className="mr-2"
            value={option}
          />
          {option}
        </label>
      ))}
    </div>
  );
}
