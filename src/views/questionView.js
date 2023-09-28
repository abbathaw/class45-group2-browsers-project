import { ANSWERS_LIST_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { createAnswerElement } from './answerView.js';


/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.
  element.innerHTML = String.raw`
    <h1>${question}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>

    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>
  `;

 
  return element;
};
export const createQuestionAndAnswerElement = (question) => {
  const element = document.createElement('div');

  const questionTitle = document.createElement('h1');
  questionTitle.innerText = question.text;
  const answersList = document.createElement('ul');
  for (const [key, answerText] of Object.entries(question.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersList.appendChild(answerElement);

  }
  const nextQuestionButton = document.createElement('button');
  nextQuestionButton.id = NEXT_QUESTION_BUTTON_ID;
  nextQuestionButton.innerText = 'Next question';
  element.appendChild(questionTitle);
  element.appendChild(answersList);
  element.appendChild(nextQuestionButton);


  return element;
};
