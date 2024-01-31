import { createSlice } from "@reduxjs/toolkit";

const initialState: QuizQuestionsState = {
  loading: true,
  error: null,
  correct: 0,
  wrong: 0,
  questions: [],
  questionIndex: 0,
  currentQuestion: null,
  remainingQuestions: [],
};

function selectRandomQuestion(state: QuizQuestionsState) {
  const emptyRemainingQuestions = state.remainingQuestions.length === 0;
  const emptyAnswers = !state.correct || !state.wrong;

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
      state.currentQuestion = selectRandomQuestion(state);
    },
    fetchQuestionsSuccess: (state, action) => {
      state.questions = action.payload;
      state.remainingQuestions = [...action.payload]; // Copy the questions to remainingQuestions
      state.currentQuestion = selectRandomQuestion(state); // Get a random question
      state.loading = false;
    },
    getNextQuestion: (state) => {
      state.currentQuestion = selectRandomQuestion(state);
    },
    submitQuestion: (state, action) => {
      state.questionIndex += 1;
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
