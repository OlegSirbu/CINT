interface IQuestion {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: Array<string>;
}

interface QuizQuestionsState {
  loading: boolean;
  error: string | null;
  correct: number;
  wrong: number;
  questionIndex: number;
  currentQuestion: IQuestion | null;
  remainingQuestions: Array<IQuestion>;
  questions: Array<IQuestion>;
}

interface FormProps {
  correctAnswer: string | string[];
  onSubmitAnswer: (isCorrect: boolean) => void;
}
