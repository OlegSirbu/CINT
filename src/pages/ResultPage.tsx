import React from "react";
import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  RootState,
  restartQuiz,
} from "src/state";
import { Button } from "src/components/elements";
import { PERCENTAGE } from "src/constants";

export const ResultPage = (): React.ReactNode => {
  const { correct, wrong, questions } = useAppSelector(
    (state: RootState) => state.quizQuestions
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleRestartQuiz() {
    dispatch(restartQuiz());
    navigate("/");
  }

  const totalQuestions = questions.length;
  const answeredQuestions = correct + wrong;
  const score = ((correct / totalQuestions) * PERCENTAGE).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold text-xl">SUMMARY</h1>
      <div className="space-y-2 my-4">
        <p>
          Correct: <b>{correct}</b>
        </p>
        <p>
          Wrong: <b>{wrong}</b>
        </p>
        <p>
          Questions answered: <b>{answeredQuestions}</b>
        </p>
        <p>
          Final Score: <b>{score}%</b>
        </p>
      </div>
      <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
    </div>
  );
};
