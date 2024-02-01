interface IQuestion {
  category: string;
  type: "text" | "boolean" | "multiple";
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

interface IQuizQuestionsState {
  loading: boolean;
  error: string | null;
  correct: number;
  wrong: number;
  currentQuestion: IQuestion | null;
  remainingQuestions: Array<IQuestion>;
  questions: Array<IQuestion>;
}
interface FormProps {
  correctAnswer: string | string[];
  onSubmitAnswer: (isCorrect: boolean) => void;
}
