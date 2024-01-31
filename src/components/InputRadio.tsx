import React from "react";
import { Control, useController } from "react-hook-form";

enum Radio {
  True = "True",
  False = "False",
}

interface InputRadioControllerProps {
  name: "answer";
  control: Control<{
    answer: string;
  }>;
}

export function InputRadio(props: InputRadioControllerProps): JSX.Element {
  const { field } = useController(props);
  return (
    <div className="flex flex-col my-4">
      <label>
        <input
          className="mr-2"
          type="radio"
          onChange={() => field.onChange(Radio.True)}
          checked={field.value === Radio.True}
        />
        True
      </label>
      <label>
        <input
          className="mr-2"
          type="radio"
          onChange={() => field.onChange(Radio.False)}
          checked={field.value === Radio.False}
        />
        False
      </label>
    </div>
  );
}
