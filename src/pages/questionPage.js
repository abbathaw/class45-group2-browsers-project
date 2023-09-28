import {
  ANSWERS_LIST_ID,
  CORRECT_ANSWERS_ID,
  NEXT_QUESTION_BUTTON_ID,
  SCORE_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  FINISH_QUIZ_BUTTON_ID,
  TIMER_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { showResultPage } from '../pages/resultPage.js';

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

  startTimer();

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

  // * #13  REFRESH PAGE ANSWER ARE STILL AVAILABLE
  const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  storedAnswers[quizData.currentQuestionIndex] =
    selectedButton.dataset.indexAnswer;
  localStorage.setItem('userAnswers', JSON.stringify(storedAnswers));
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
    correctAnswersResults();
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

const nextQuestion = () => {
  quizData.currentQuestionIndex += 1;
  initQuestionPage();
};

const disableNextButton = () => {
  let nextButton = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  nextButton.disabled = true;
};

// *  #14: SKIP BUTTON
const skipQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  if (currentQuestion) {
    const skipBox = document.createElement('div');

    document.body.appendChild(skipBox);

    skipBox.innerText = `🦉${currentQuestion.correct}`.toUpperCase();

    skipBox.style.cssText = `  font-size: 129px;`; // * need Style

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

//TIMER
let count = 15;
let interval;

const startTimer = () => {
  count = 15;
  clearInterval(interval);

  interval = setInterval(function () {
    document.getElementById(TIMER_ID).textContent = `TIMER: ${count} seconds`;
    count--;
    if (count === 0) {
      clearInterval(interval);
      document.getElementById(TIMER_ID).textContent = 'Out of time!';
      if (disableNextButton) {
        showResultPage();
      } else {
        nextQuestion();
      }
    }
  }, 1000);
};
