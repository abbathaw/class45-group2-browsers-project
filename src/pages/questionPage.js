import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

// const capitalLetterCorrectAnswer = `${currentQuestion.correct}`.toUpperCase();
export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  const questionElement = createQuestionElement(currentQuestion.text);

  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', skipQuestion);
};

const nextQuestion = () => {
  quizData.currentQuestionIndex += 1;
  initQuestionPage();
};

// #14: SKIP BUTTON
const skipQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  if (currentQuestion) {
    const skipBox = document.createElement('div');

    document.body.appendChild(skipBox);

    skipBox.innerText = `🦉${currentQuestion.correct}`.toUpperCase();

    skipBox.style.cssText = `
    padding: 9%;
    width: 29%;
    background-color: #f56300;
    font-family: 'SF Pro Text SF Pro Icons';
    color: #0071e3;
    position: fixed;
    left: 50%;
    top: 50%;
    font-size: 229px;
    transform: translate(-50%, -50%);
    z-index: 1984;
  `;

    // to remove after 2.5 seconds
    setTimeout(() => {
      document.body.removeChild(skipBox);
    }, 2500);
  }

  nextQuestion();
};
