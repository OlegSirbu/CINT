export default function randomizeQuestions(
  correctAnswer: string | string[],
  incorrectAnswers: string | string[]
): string[] {
  const answers = [
    ...(Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer]),
    ...(Array.isArray(incorrectAnswers)
      ? incorrectAnswers
      : [incorrectAnswers]),
  ];

  return answers.sort(() => Math.random() - 0.5);
}
// In the real world app we'd probably use more robust shuffling algorithm for better randomness.
// But for simple use cases or small arrays, the current method might be just ok.
