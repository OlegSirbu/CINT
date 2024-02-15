import React, { useMemo } from "react";
import { useAppDispatch } from "src/state/hooks";
import he from "he";

import randomizeQuestions from "src/utils/randomizeQuestions";
import { submitQuestion, getNextQuestion } from "src/state";
import { TextForm, BooleanForm, MultipleForm } from "src/components/forms";
import { QuestionType } from "src/constants";

interface QuestionProps {
  type: QuestionType;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

export const Question: React.FC<QuestionProps> = ({
  type,
  question,
  correctAnswer,
  incorrectAnswers,
}) => {
  const dispatch = useAppDispatch();
  const handleSubmit = async (isCorrect: boolean) => {
    await dispatch(submitQuestion(isCorrect));
    dispatch(getNextQuestion());
  };

  const answers = useMemo(
    () => randomizeQuestions(correctAnswer, incorrectAnswers),
    [correctAnswer, incorrectAnswers]
  );

  const renderQuestion = (): React.ReactNode | null => {
    const commonProps = {
      correctAnswer,
      onSubmitAnswer: handleSubmit,
    };

    switch (type) {
      case QuestionType.Text:
        return <TextForm {...commonProps} />;
      case QuestionType.Boolean:
        return <BooleanForm {...commonProps} />;
      case QuestionType.Multiple:
        return <MultipleForm {...commonProps} options={answers} />;
      default:
        return null;
    }
  };

  return (
    <>
      <h2 className="py-4">{question && he.decode(question)}</h2>
      {renderQuestion()}
    </>
  );
};
