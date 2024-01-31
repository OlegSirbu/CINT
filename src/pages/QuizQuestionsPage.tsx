import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  fetchQuestions,
} from "state";

import { Question } from "components";

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

  useEffect(() => {
    const noRemainingQuestions = remainingQuestions.length === 0;
    const allQuestionsAnswered =
      correct + wrong === questions.length && questions.length > 0;

    if (noRemainingQuestions && allQuestionsAnswered) {
      navigate("/results");
    }
  }, [remainingQuestions, correct, wrong, questions]);

  return (
    <div className="container mx-auto p-4">
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {currentQuestion && <Question {...(currentQuestion as IQuestion)} />}
    </div>
  );
}
