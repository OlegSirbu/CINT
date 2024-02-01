import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, ErrorMessage } from "src/components/elements";

const validationSchema = yup.object().shape({
  answer: yup.boolean().required("Please select one option"),
});

interface BooleanFormValues {
  answer: boolean;
}

enum RadioToggle {
  True = "true",
  False = "false",
}

type BooleanFormProps = {
  correctAnswer: string;
  onSubmitAnswer: (isCorrect: boolean) => void;
};

export const BooleanForm: React.FC<BooleanFormProps> = ({
  correctAnswer,
  onSubmitAnswer,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BooleanFormValues>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ answer }: BooleanFormValues) => {
    onSubmitAnswer(
      String(answer).toLocaleLowerCase() === correctAnswer.toLocaleLowerCase()
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col my-4">
        <label>
          <input
            {...register("answer")}
            value={RadioToggle.True}
            className="mr-2"
            type="radio"
          />
          True
        </label>
        <label>
          <input
            {...register("answer")}
            value={RadioToggle.False}
            className="mr-2"
            type="radio"
          />
          False
        </label>
      </div>
      <ErrorMessage message={errors?.answer?.message ?? null} />
      <Button>Next</Button>
    </form>
  );
};
