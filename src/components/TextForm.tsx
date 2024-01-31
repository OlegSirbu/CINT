import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { InputText } from "./InputText";
import { ErrorMessage } from "./ErrorMessage";
import { Button } from "../components";

const validationSchema = yup.object().shape({
  field: yup.string().required("This field is required"),
});

interface TextFormValues {
  field: string;
}

export function TextForm({
  correctAnswer,
  onSubmitAnswer,
}: FormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TextFormValues>({
    defaultValues: {
      field: "",
    },
    resolver: yupResolver(validationSchema),
  });

  function onSubmit({ field }: TextFormValues) {
    onSubmitAnswer(field === correctAnswer);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText name="field" control={control} />
      {errors?.field?.message && (
        <ErrorMessage message={errors.field.message} />
      )}
      <Button>Next</Button>
    </form>
  );
}
