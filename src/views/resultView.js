import { getQuizData } from '../data.js';

const quizData = getQuizData();

export const createResultElement = () => {
  const element = document.createElement('div');
  element.classList.add('result-page-container');

  const templete = `
  <div class="correct-answer-number">
  <h2>NUMBER OF CORRECT ANSWERS: ${quizData.correctAnswers}/${quizData.questions.length}</h2>
 </div>
  <div class="result-score">
   <h3>YOUR SCORE</h3>
   <p>${quizData.score}</p>
  </div>
 `;

  element.innerHTML = templete;

  return element;
};
