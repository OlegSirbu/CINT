import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { CheckboxGroup, ErrorMessage, Button } from "components";

interface MultipleFormValues {
  answers: string[];
}
type MultipleFormProps = {
  correctAnswer: string | string[];
  options: Array<string>;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

const validationSchema = yup.object().shape({
  answers: yup.array().min(1).required("Select as minimum one option"),
});

export function MultipleForm({
  correctAnswer,
  options,
  onSubmitAnswer,
}: MultipleFormProps): JSX.Element {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<MultipleFormValues>({
    resolver: yupResolver(validationSchema),
  });

  function onSubmit({ answers }: MultipleFormValues) {
    //TODO simplify
    onSubmitAnswer(
      Array.isArray(correctAnswer)
        ? correctAnswer.some((answer) => answers.includes(answer))
        : answers.includes(correctAnswer)
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CheckboxGroup options={options} name="answers" control={control} />
      {errors?.answers?.message && (
        <ErrorMessage message={errors?.answers?.message} />
      )}
      <Button>Next</Button>
    </form>
  );
}
