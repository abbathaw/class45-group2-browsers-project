/**
 * Create an Answer element
 * @returns {Element}
 */
// import { quizData } from '../data.js';
import { selectAnswer } from '../pages/answerPage.js';

export const createAnswerElement = (key, answerText) => {
  const answerButton = document.createElement('button');
  answerButton.classList.add('btn', 'answer-btn');
  answerButton.dataset.question = key;
  answerButton.innerHTML = String.raw`
    ${key} ${answerText}
  `;

  // * help to move to pages
  answerButton.addEventListener('click', () => {
    selectAnswer(answerButton);
  });

  const answerListItem = document.createElement('li');
  answerListItem.appendChild(answerButton);
  return answerListItem;
};
