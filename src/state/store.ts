import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import quizQuestionsReducer from "../state/reducers/quizQuestionsReducer";

export const store = configureStore({
  reducer: {
    quizQuestions: quizQuestionsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
