import React from "react";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { RootState } from "../state/store";
import { useNavigate } from "react-router-dom";
import { restartQuiz } from "../state/reducers/quizQuestionsReducer";
import { Button } from "../components";

export function ResultPage(): JSX.Element {
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
  const score = (correct / totalQuestions) * 100;

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="font-bold text-xl">SUMMARY</h1>
      <div className="space-y-2 my-4">
        <p>
          Correct: <b>{correct}</b>
        </p>
        <p>
          Wrong: <b>{wrong}</b>
        </p>
        <p>
          Questions answered <b>{answeredQuestions}</b>
        </p>
        <p>
          Final Score: <b>{!isNaN(score) && score}%</b>
        </p>
      </div>
      <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
    </div>
  );
}
