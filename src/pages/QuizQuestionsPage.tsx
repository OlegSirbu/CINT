import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../state/hooks";

import { RootState } from "../state/store";
import { fetchQuestions } from "../state/actions/quizQuestionsActions";
import { Question } from "../components/Question";

export function QuizQuestionsPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    correct,
    wrong,
    currentQuestion,
    questions,
    remainingQuestions,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.quizQuestions);

  useEffect(() => {
    dispatch(fetchQuestions());
  }, []);

  const noRemainingQuestions = remainingQuestions.length === 0;
  const allQuestionsAnswered = correct + wrong === questions.length;

  if (noRemainingQuestions && allQuestionsAnswered) {
    navigate("/results");
  }

  const isPageReady = loading === false && error === null;

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {isPageReady && <Question {...currentQuestion} />}
    </div>
  );
}
