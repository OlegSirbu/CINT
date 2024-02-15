import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IQuizQuestionsState = {
  loading: true,
  error: null,
  correct: 0,
  wrong: 0,
  questions: [] as IQuestion[],
  currentQuestion: null,
  remainingQuestions: [] as IQuestion[],
};

function selectRandomQuestion(state: IQuizQuestionsState) {
  const emptyRemainingQuestions = state.remainingQuestions.length === 0;
  const emptyAnswers = state.correct === 0 || state.wrong === 0;

  if (emptyRemainingQuestions && emptyAnswers) {
    state.remainingQuestions = [...state.questions]; // Reset remainingQuestions when all questions have been used
  }
  const randomIndex = Math.floor(
    Math.random() * state.remainingQuestions.length
  );
  const nextQuestion = state.remainingQuestions[randomIndex];
  state.remainingQuestions.splice(randomIndex, 1); // Remove the question from the array
  return nextQuestion;
}

export const quizQuestionsSlice = createSlice({
  name: "quizQuestions",
  initialState,
  reducers: {
    restartQuiz: (state) => {
      state.correct = 0;
      state.wrong = 0;
      state.error = null;
      state.remainingQuestions = [];
      state.currentQuestion = selectRandomQuestion(state);
    },
    fetchQuestionsSuccess: (state, action: PayloadAction<IQuestion[]>) => {
      state.questions = action.payload;
      state.remainingQuestions = [...action.payload];
      state.currentQuestion = selectRandomQuestion(state);
      state.loading = false;
    },
    getNextQuestion: (state) => {
      state.currentQuestion = selectRandomQuestion(state);
    },
    submitQuestion: (state, action) => {
      if (action.payload) {
        state.correct += 1;
      } else {
        state.wrong += 1;
      }
    },
    fetchQuestionsStart: (state) => {
      state.loading = true;
    },
    fetchQuestionsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuestionsFail,
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  submitQuestion,
  getNextQuestion,
  restartQuiz,
} = quizQuestionsSlice.actions;

export default quizQuestionsSlice.reducer;
