/**
 * Create an Answer element
 * @returns {Element}
 */
import { selectAnswer } from '../pages/questionPage.js';

export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  const answerButton = document.createElement('button');

  element.appendChild(answerButton);
  answerButton.innerHTML = String.raw`
    ${key}) ${answerText}
  `;
  answerButton.classList.add('btn');
  answerButton.classList.add('answer-btn');
  answerButton.setAttribute('data-index-answer', key);
  answerButton.onclick = selectAnswer;

  return element;
};
