export function randomizeQuestions(
  correctAnswer: string | string[],
  incorrectAnswers: string | string[]
) {
  let answers: string[] = [];

  if (Array.isArray(correctAnswer)) {
    answers = answers.concat(correctAnswer);
  }
  if (typeof correctAnswer === "string") {
    answers.push(correctAnswer);
  }
  if (Array.isArray(incorrectAnswers)) {
    answers = answers.concat(incorrectAnswers);
  }
  if (typeof incorrectAnswers === "string") {
    if (Array.isArray(correctAnswer)) {
      answers.push(...correctAnswer);
    } else {
      answers.push(correctAnswer);
    }
  }
  return answers.sort(() => Math.random() - 0.5);
}
