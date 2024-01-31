import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { RootState } from "../state/store";
import { fetchQuestions } from "../state/actions/quizQuestionsActions";
import { Question } from "../components/Question";

export function QuizQuestionsPage(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    correct,
    wrong,
    currentQuestion,
    questions,
    remainingQuestions,
    loading,
    error,
  } = useSelector((state: RootState) => state.quizQuestions);

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
