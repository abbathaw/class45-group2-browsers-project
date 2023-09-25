/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.innerHTML = String.raw`
    ${key}: ${answerText};
  `;
  element.addEventListener('click', () => {
    const { currentQuestionIndex, questions } = quizData;
    questions[currentQuestionIndex].selected = key;
  });

  return element;
};
