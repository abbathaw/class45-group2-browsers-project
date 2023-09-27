/**
 * Create an Answer element
 * @returns {Element}
 */
import { quizData } from '../data.js';

export const createAnswerElement = (key, answerText) => {
  const answerButton = document.createElement('button');
  answerButton.classList.add('btn', 'answer-btn');
  answerButton.setAttribute('data-index-answer', key);
  answerButton.innerHTML = String.raw`
    ${key} ${answerText}
  `;
  answerButton.addEventListener('click', selectAnswer);

  const answerListItem = document.createElement('li');
  answerListItem.appendChild(answerButton);
  return answerListItem;
};

const selectAnswer = (e) => {
  const selectedButton = e.target;
  const isAnswerCorrect =
    selectedButton.dataset.indexAnswer ==
    quizData.questions[quizData.currentQuestionIndex].correct;

  quizData.questions[quizData.currentQuestionIndex].selected =
    selectedButton.dataset.indexAnswer;

  changeBtnColor(
    selectedButton,
    isAnswerCorrect ? 'correct-answer' : 'wrong-answer'
  );

  document
    .querySelectorAll('.answer-btn')
    .forEach((button) => (button.disabled = true));

  // REFRESH PAGE ANSWER ARE STILL AVAILABLE
  const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  storedAnswers[quizData.currentQuestionIndex] =
    selectedButton.dataset.indexAnswer;
  localStorage.setItem('userAnswers', JSON.stringify(storedAnswers));
};

const changeBtnColor = (button, colorClass) => {
  document
    .querySelectorAll('.answer-btn')
    .forEach((b) => b.classList.remove('correct-answer', 'wrong-answer'));
  button.classList.add(colorClass);
};
