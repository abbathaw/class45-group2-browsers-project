
import { USER_INTERFACE_ID, NEXT_QUESTION_BUTTON_ID, SKIP_QUESTION_BUTTON_ID, FINISH_QUIZ_BUTTON_ID } from '../constants.js'; 
import { nextQuestion, skipQuestion } from './questionPage.js';
import { showResultPage } from '../pages/resultPage.js';
import { quizData } from '../data.js';

export const transitionQuestionWithFade = (currentQuestionElement, nextQuestionElement) => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);

  //adding the fade-out class to the current question
  currentQuestionElement.classList.add('question-fade-exit');
  currentQuestionElement.classList.add('question-fade-exit-active');

  setTimeout(() => {
    // Removing the current question element
    userInterface.removeChild(currentQuestionElement);

    // Adding the fade-in class to the next question
    nextQuestionElement.classList.add('question-fade-enter');
    nextQuestionElement.classList.add('question-fade-enter-active');

    // Append the next question element
    userInterface.appendChild(nextQuestionElement);
    document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', ()=>nextQuestion(nextQuestionElement));

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

    setTimeout(() => {
      currentQuestionElement.classList.remove('question-fade-exit', 'question-fade-exit-active');
      nextQuestionElement.classList.remove('question-fade-enter', 'question-fade-enter-active');
    }, 500); //
  }, 500); // 
};
