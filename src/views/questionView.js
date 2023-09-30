import { ANSWERS_LIST_ID, SCORE_ID, TIMER_ID } from '../constants.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { createAnswerElement } from './answerView.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question, quizData) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.

  element.innerHTML = String.raw`
    <div >
    <p> YOU ARE ON ${quizData.currentQuestionIndex + 1}/${
    quizData.questions.length
  }</p>
      </div>
    <img class="question-mark" src = "./public/files/ask.png" alt="Question Mark"/>
    <h1 class='question-title'>${question?.text}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>
<div class='navigation-buttons'>
    <button id="${SKIP_QUESTION_BUTTON_ID}"> 
    Skip 
    </button>

    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>

    <button id="${FINISH_QUIZ_BUTTON_ID}">
     Finish quiz
    </button>
</div>
    <p id="${SCORE_ID}">
      SCORE: ${quizData.score}
    </p>

    <p id="${TIMER_ID}">
      Start
    </p>
  `;

  const ulElement = element.querySelector(`#${ANSWERS_LIST_ID}`);
  for (const [key, answerText] of Object.entries(question.answers)) {
    const liElement = createAnswerElement(key, answerText);
    ulElement.appendChild(liElement);
  }

  return element;
};
