import {
  fetchQuestionsStart,
  fetchQuestionsSuccess,
  fetchQuestionsFail,
} from "../reducers/quizQuestionsReducer";
import { Dispatch } from "redux";

function toCamelCase(obj: object) {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v));
  } else if (obj !== null && obj.constructor === Object) {
    return Object.keys(obj).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(obj[key]),
      }),
      {}
    );
  }
  return obj;
}

function camelCase(str: string) {
  return str.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
}

export const fetchQuestions = () => async (dispatch: Dispatch) => {
  dispatch(fetchQuestionsStart());
  try {
    const url = "../../../src/API/data.json";
    const { results } = await fetch(url).then((data) => data.json());
    const dataInCamelCase = results.map((result: any) => toCamelCase(result));

    dispatch(fetchQuestionsSuccess(dataInCamelCase));
  } catch (error) {
    dispatch(fetchQuestionsFail(error?.message));
  }
};
