import { ANSWERS_LIST_ID, SCORE_ID, TIMER_ID } from '../constants.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { NEXT_QUESTION_BUTTON_ID } from '../constants.js';
import { createAnswerElement } from './answerView.js';
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

    <p id="${SCORE_ID}">
      SCORE: ${quizData.score}
    </p>

    <p id="${TIMER_ID}">
      Start
    </p>
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

  const skipQuestion = document.createElement('button');
  skipQuestion.id = SKIP_QUESTION_BUTTON_ID;
  skipQuestion.innerText = 'Skip question';
  element.appendChild(skipQuestion);

  const finishButton = document.createElement('button');
  finishButton.id = FINISH_QUIZ_BUTTON_ID;
  finishButton.innerText = 'Finish button';
  element.appendChild(finishButton);

  const timerElement = document.createElement('p');
  timerElement.id = TIMER_ID;
  timerElement.innerText = 'Timer';
  element.appendChild(timerElement);

  const scoreElement = document.createElement('p');
  scoreElement.id = SCORE_ID;
  scoreElement.innerText = 'Score';
  element.appendChild(scoreElement);

  return element;
};
