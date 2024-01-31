import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { InputRadio } from "./InputRadio";
import { ErrorMessage } from "./ErrorMessage";
import { Button } from "../components";

const validationSchema = yup.object().shape({
  answer: yup.string().required("Please select one option"),
});

type BooleanFormValues = {
  answer: string;
};
//all components should be in one style (function)
//absolute

export function BooleanForm({
  correctAnswer,
  onSubmitAnswer,
}: FormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<BooleanFormValues>({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit({ answer }: BooleanFormValues) {
    onSubmitAnswer(answer === correctAnswer); // "True"
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputRadio name="answer" control={control} />
      {errors?.answer?.message && (
        <ErrorMessage message={errors.answer.message} />
      )}
      <Button>Next</Button>
    </form>
  );
}
