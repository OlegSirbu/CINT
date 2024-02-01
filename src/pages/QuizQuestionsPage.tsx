import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  fetchQuestions,
} from "src/state";
import { QuestionType } from "src/constants";
import { Question } from "src/components";

export const QuizQuestionsPage: React.FC = () => {
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
    if (questions.length === 0) {
      dispatch(fetchQuestions());
    }
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
      {currentQuestion && (
        <Question
          type={currentQuestion.type as QuestionType}
          question={currentQuestion.question}
          correctAnswer={currentQuestion.correctAnswer}
          incorrectAnswers={currentQuestion.incorrectAnswers}
        />
      )}
    </div>
  );
};
