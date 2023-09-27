import { quizData } from '../data.js';

export const createResultElement = () => {
  const element = document.createElement('div');
  const scoreElm = document.createElement('p');
  const correctAnswerElm = document.createElement('p');

  scoreElm.textContent = `YOUR SCORE: ${quizData.score}`;
  correctAnswerElm.textContent = `NUMBER OF CORRECT ANSWERS: ${quizData.correctAnswers}`;
  element.appendChild(scoreElm);
  element.appendChild(correctAnswerElm);
  return element;
};
