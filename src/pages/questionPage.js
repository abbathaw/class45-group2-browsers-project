import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';

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

    document
      .getElementById(NEXT_QUESTION_BUTTON_ID)
      .addEventListener('click', nextQuestion);

    document
      .getElementById(SKIP_QUESTION_BUTTON_ID)
      .addEventListener('click', skipQuestion);
  }
};

const nextQuestion = () => {
  quizData.currentQuestionIndex += 1;
  initQuestionPage();
};

// #14: SKIP BUTTON  {STYLE ?}
const skipQuestion = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  if (currentQuestion) {
    const skipBox = document.createElement('div');

    document.body.appendChild(skipBox);

    skipBox.innerText = `${currentQuestion.correct}`.toUpperCase();

    // to remove after 2 seconds
    setTimeout(() => {
      document.body.removeChild(skipBox);
    }, 2000);
  }

  nextQuestion();
};
