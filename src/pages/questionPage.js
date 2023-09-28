import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionAndAnswerElement, createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { transitionQuestionWithFade } from './transition.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
const questionAnswerElement = createQuestionAndAnswerElement(currentQuestion)
 
  if(quizData.currentQuestionIndex === 0){
    userInterface.innerHTML = '';
    userInterface.appendChild(questionAnswerElement);
  }
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', ()=>nextQuestion(questionAnswerElement))

};

export const nextQuestion = (currentQuestion) => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

const nextQuestion = quizData.questions[quizData.currentQuestionIndex];
const questionAnswerElement = createQuestionAndAnswerElement(nextQuestion)
  transitionQuestionWithFade(currentQuestion, questionAnswerElement );
  initQuestionPage();
};
