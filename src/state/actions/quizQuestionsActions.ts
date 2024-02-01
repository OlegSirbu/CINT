import toCamelCase from "src/utils/convertToCamelCase";
import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFail,
} from "src/state/reducers/quizQuestionsReducer";
import { Dispatch } from "redux";

export const fetchQuestions = () => async (dispatch: Dispatch) => {
  dispatch(fetchQuestionsStart());
  try {
    const url = "src/API/data.json";
    const results = await fetch(url)
      .then((data) => data.json())
      .then(({ results }) => results.map((result: any) => toCamelCase(result)));

    dispatch(fetchQuestionsSuccess(results));
  } catch (error: unknown | { message: string }) {
    dispatch(fetchQuestionsFail((error as { message: string })?.message));
  }
};
