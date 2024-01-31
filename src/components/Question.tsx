import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import he from "he";

import {
  submitQuestion,
  getNextQuestion,
} from "../state/reducers/quizQuestionsReducer";

import { randomizeQuestions } from "../utils/randomizeQuestions";
import { TextForm, BooleanForm, MultipleForm } from ".";

enum QuestionType {
  Text = "text",
  Boolean = "boolean",
  Multiple = "multiple",
}

export function Question({
  type,
  question,
  correctAnswer,
  incorrectAnswers,
}: IQuestion): JSX.Element {
  const dispatch = useDispatch();

  const answers = useMemo(
    () => randomizeQuestions(correctAnswer, incorrectAnswers),
    [correctAnswer, incorrectAnswers]
  );

  const renderQuestion = () => {
    switch (type) {
      case QuestionType.Text:
        return (
          <TextForm correctAnswer={correctAnswer} onSubmitAnswer={onSubmit} />
        );
      case QuestionType.Boolean:
        return (
          <BooleanForm
            correctAnswer={correctAnswer}
            onSubmitAnswer={onSubmit}
          />
        );
      case QuestionType.Multiple:
        return (
          <MultipleForm
            correctAnswer={correctAnswer}
            options={answers}
            onSubmitAnswer={onSubmit}
          />
        );
      default:
        return null;
    }
  };

  function onSubmit(isCorrect: boolean) {
    dispatch(submitQuestion(isCorrect));
    dispatch(getNextQuestion());
  }

  return (
    <>
      <h2 className="py-4">{question && he.decode(question)}</h2>
      {renderQuestion()}
    </>
  );
}
