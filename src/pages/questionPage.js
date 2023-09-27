import {
  ANSWERS_LIST_ID,
  CORRECT_ANSWERS_ID,
  NEXT_QUESTION_BUTTON_ID,
  SCORE_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  FINISH_QUIZ_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { showResultPage } from '../pages/resultPage.js';

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

  document
    .getElementById(FINISH_QUIZ_BUTTON_ID)
    .addEventListener('click', showResultPage);

  if (quizData.currentQuestionIndex >= quizData.questions.length - 1) {
    document
      .getElementById(SKIP_QUESTION_BUTTON_ID)
      .addEventListener('click', showResultPage);
  }
  if (quizData.currentQuestionIndex >= quizData.questions.length - 2) {
    document
      .getElementById(NEXT_QUESTION_BUTTON_ID)
      .addEventListener('click', disableNextButton);
  }
};

const nextQuestion = () => {
  quizData.currentQuestionIndex += 1;
  initQuestionPage();
};

const disableNextButton = () => {
  let nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  nextButton.disabled = true;
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
    font-size: 200px;
    transform: translate(-50%, -50%);
    z-index: 1984;
  `;

    // to remove after 2.5 seconds
    setTimeout(() => {
      document.body.removeChild(skipBox);
      if (quizData.currentQuestionIndex >= quizData.questions.length - 1) {
        disableNextButton();
      }
    }, 2500);
  }

  nextQuestion();
};

//SCORE update in real-time
const scoreUpdate = () => (quizData.score = 0);

scoreUpdate();

export const scoreRealTimeUpdate = () => {
  const scoreDisplay = document.getElementById(SCORE_ID);
  scoreDisplay.textContent = `SCORE: ${quizData.score}`;
};

//CORRECT ANSWERS result
const correctAnswers = () => (quizData.correctAnswers = 0);
correctAnswers();

export const correctAnswersResults = () => {
  const correctAnswersDisplay = document.getElementById(CORRECT_ANSWERS_ID);
  if (correctAnswersDisplay)
    correctAnswersDisplay.textContent = `CORRECT ANSWERS: ${quizData.correctAnswers}`;
};
