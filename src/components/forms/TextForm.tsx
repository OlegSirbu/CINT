import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Button, ErrorMessage } from "src/components/elements";

interface TextFormValues {
  field: string;
}

interface TextFormProps {
  correctAnswer: string;
  onSubmitAnswer: (isCorrect: boolean) => void;
}

const validationSchema = yup.object().shape({
  field: yup.string().required("This field is required"),
});

export const TextForm = ({
  correctAnswer,
  onSubmitAnswer,
}: TextFormProps): React.ReactNode => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TextFormValues>({
    defaultValues: {
      field: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = ({ field }: TextFormValues) => {
    onSubmitAnswer(
      field.toLocaleLowerCase() === correctAnswer.toLocaleLowerCase()
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        {...register("field")}
        className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 my-4"
      />
      <ErrorMessage message={errors?.field?.message ?? null} />
      <Button>Next</Button>
    </form>
  );
};
