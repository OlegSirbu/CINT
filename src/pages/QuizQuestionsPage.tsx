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
    // Check if there are no remaining questions
    const hasNoRemainingQuestions = remainingQuestions.length === 0;
    // Check if all questions have been answered and there is at least one question
    const hasAllQuestionsAnswered =
      questions.length > 0 && correct + wrong === questions.length;

    if (hasNoRemainingQuestions && hasAllQuestionsAnswered) {
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
