import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFail,
} from "../reducers/quizQuestionsReducer";
import { Dispatch } from "redux";

export const fetchQuestions = () => async (dispatch: Dispatch) => {
  dispatch(fetchQuestionsStart());
  try {
    const url = "../../../src/API/data.json";
    const { results } = await fetch(url).then((data) => data.json());

    //transform to camelCase
    dispatch(fetchQuestionsSuccess(results));
  } catch (error) {
    dispatch(fetchQuestionsFail(error?.message));
  }
};
