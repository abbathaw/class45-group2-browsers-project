import { ANSWERS_LIST_ID, SCORE_ID, TIMER_ID } from '../constants.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { quizData } from '../data.js';

/**
 * Create a full question element
 * @returns {Element}
 */
export const createQuestionElement = (question) => {
  const element = document.createElement('div');

  // I use String.raw just to get fancy colors for the HTML in VS Code.

  element.innerHTML = String.raw`
    <div >
    <p> YOU ARE ON ${quizData.currentQuestionIndex + 1}/${
    quizData.questions.length
  }</p>
      </div>
    <h1>${question}</h1>

    <ul id="${ANSWERS_LIST_ID}">
    </ul>

    <button id="${SKIP_QUESTION_BUTTON_ID}"> 
    Skip 
    </button>

    <button id="${NEXT_QUESTION_BUTTON_ID}">
      Next question
    </button>

    <button id="${FINISH_QUIZ_BUTTON_ID}">
     Finish quiz
    </button>

    <div id="${SCORE_ID}">
      SCORE: ${quizData.score}
    </div>

    <div id="${TIMER_ID}">
      Start
    </div>
  `;

  return element;
};
