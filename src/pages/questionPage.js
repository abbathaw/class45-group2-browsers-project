import {
  NEXT_QUESTION_BUTTON_ID,
  SCORE_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  FINISH_QUIZ_BUTTON_ID,
  TIMER_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';

import { transitionQuestionWithFade } from './transition.js';

import { showResultPage } from '../pages/resultPage.js';
import { getQuizData, saveQuizData } from '../data.js';

const quizData = getQuizData();
export const initQuestionPage = (isRefresh = false) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const questionAnswerElement = createQuestionElement(
    currentQuestion,
    quizData
  );

  if (quizData.currentQuestionIndex === 0 || isRefresh) {
    userInterface.innerHTML = '';
    userInterface.appendChild(questionAnswerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', () => nextQuestion(questionAnswerElement));

  startTimer(questionAnswerElement);

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', () => skipQuestion(questionAnswerElement));

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

export const selectAnswer = (e) => {
  const selectedButton = e.target;
  const isAnswerCorrect =
    selectedButton.dataset.indexAnswer ===
    quizData.questions[quizData.currentQuestionIndex].correct;

  quizData.questions[quizData.currentQuestionIndex].selected =
    selectedButton.dataset.indexAnswer;

  document.getElementById(SKIP_QUESTION_BUTTON_ID).disabled = true;

  if (quizData.questions[quizData.currentQuestionIndex].selected) {
    Array.from(document.querySelectorAll('#answers-list li button')).forEach(
      (b) => {
        b.disabled = true;
      }
    );
  }

  if (isAnswerCorrect) {
    changeBtnColor(selectedButton, 'correct-answer');
    quizData.score += 10;
    scoreRealTimeUpdate();
    quizData.correctAnswers++;
  } else {
    changeBtnColor(selectedButton, 'wrong-answer');
  }
};

const changeBtnColor = (button, colorClass) => {
  resetAnswerColorClasses();
  button.classList.add(colorClass);
};

const resetAnswerColorClasses = () => {
  Array.from(document.querySelectorAll('#answers-list li button')).forEach(
    (b) => {
      b.classList.remove('correct-answer');
      b.classList.remove('wrong-answer');
      if (
        b.dataset.indexAnswer ===
        quizData.questions[quizData.currentQuestionIndex].correct
      ) {
        setTimeout(() => {
          b.classList.add('correct-answer');
        }, 500);
      }
    }
  );
};

const disableNextButton = () => {
  let nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  nextButton.disabled = true;
};

// *  #14: SKIP BUTTON
export const skipQuestion = (currentQuestionToSkip) => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  if (currentQuestion) {
    const skipBox = document.createElement('div');
    skipBox.id = 'skipBox'; // Add this line here

    document.body.appendChild(skipBox);

    skipBox.innerText = ` The right answer for question ${
      quizData.currentQuestionIndex + 1
    } is: ${currentQuestion.correct}. `;

    // skipBox.style.cssText = ``;

    if (quizData.currentQuestionIndex >= quizData.questions.length - 1) {
      disableNextButton();
    }
    // to remove after 2.5 seconds
    setTimeout(() => {
      document.body.removeChild(skipBox);
    }, 2500);
  }

  nextQuestion(currentQuestionToSkip);
};

export const scoreRealTimeUpdate = () => {
  const scoreDisplay = document.getElementById(SCORE_ID);
  scoreDisplay.textContent = `SCORE: ${quizData.score}`;
};

//CORRECT ANSWERS
const correctAnswers = () => (quizData.correctAnswers = 0);
correctAnswers();

//TIMER

let count;
let interval;

const startTimer = (currentQuestion) => {
  count = 16;
  clearInterval(interval);

  interval = setInterval(function () {
    const timerElement = document.getElementById(TIMER_ID);
    timerElement.textContent = `TIMER: ${count - 1} sec`;
    count--;
    if (count == 0) {
      clearInterval(interval);
      timerElement.textContent = 'Out of time!';
      setTimeout(() => {
        if (quizData.currentQuestionIndex >= quizData.questions.length - 1) {
          showResultPage();
        } else {
          nextQuestion(currentQuestion);
        }
      }, 1000);
    }
  }, 1000);
};

export const nextQuestion = (currentQuestion) => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  saveQuizData(quizData);
  const nextQuestion = quizData.questions[quizData.currentQuestionIndex];
  if (!nextQuestion) {
    showResultPage();
    return;
  }

  const questionAnswerElement = createQuestionElement(nextQuestion, quizData);
  transitionQuestionWithFade(currentQuestion, questionAnswerElement);

  initQuestionPage();
};
