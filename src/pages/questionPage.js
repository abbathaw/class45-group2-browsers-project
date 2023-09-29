import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SCORE_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  FINISH_QUIZ_BUTTON_ID,
  TIMER_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { showResultPage } from '../pages/resultPage.js';
import { getQuizData, saveQuizData } from '../data.js';

const quizData = getQuizData();
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

  if (quizData.currentQuestionIndex >= quizData.questions.length - 1) {
    disableNextButton();
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

const nextQuestion = () => {
  quizData.currentQuestionIndex += 1;
  saveQuizData(quizData);
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

    skipBox.innerText = `The right answer is: ${
      currentQuestion.correct
    } for question: ${quizData.currentQuestionIndex + 1}`;

    // * need Style
    skipBox.style.cssText = `    
      font-size: 29px;
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

//CORRECT ANSWERS
const correctAnswers = () => (quizData.correctAnswers = 0);
correctAnswers();

//TIMER

let count;
let interval;

const startTimer = () => {
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
          nextQuestion();
        }
      }, 1000);
    }
  }, 1000);
};
