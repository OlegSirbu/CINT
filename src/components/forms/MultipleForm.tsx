import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, ErrorMessage } from "src/components/elements";

interface MultipleFormValues {
  answers: string[];
}

interface MultipleFormProps {
  correctAnswer: string | string[];
  options: string[];
  onSubmitAnswer: (isCorrect: boolean) => void;
}

const validationSchema = yup.object().shape({
  answers: yup.array().min(1).required("Select as minimum one option"),
});

export const MultipleForm = ({
  correctAnswer,
  options,
  onSubmitAnswer,
}: MultipleFormProps): React.ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MultipleFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ answers }: MultipleFormValues) => {
    const isCorrect: boolean = Array.isArray(correctAnswer)
      ? correctAnswer.every((answer: string) => answers.includes(answer))
      : answers.includes(correctAnswer);
    onSubmitAnswer(isCorrect);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col my-4">
        {options.map((option) => (
          <label className="pr-4 cursor-pointer" key={option}>
            <input
              {...register("answers")}
              type="checkbox"
              className="mr-2"
              value={option}
            />
            {option}
          </label>
        ))}
      </div>
      <ErrorMessage message={errors?.answers?.message ?? null} />
      <Button>Next</Button>
    </form>
  );
};
