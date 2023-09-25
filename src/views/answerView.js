/**
 * Create an Answer element
 * @returns {Element}
 */
import { viewScore, score } from './score.js';

export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.innerHTML = String.raw` 
    <input type="radio" data-answer="${key}" name="answer">
    ${key}: ${answerText}
  `; 

  element.querySelector('input').addEventListener('change', (event) => {
    const selectedAnswer = event.target.dataset.answer;
    const { currentQuestionIndex, questions } = quizData;
    questions[currentQuestionIndex].selected = selectedAnswer;

    const correctAnswer = questions[currentQuestionIndex].correct;

    const correctAnswerElement = document.createElement('div');
    correctAnswerElement.classList.add('correct-answer');
    correctAnswerElement.textContent = `Correct Answer: ${correctAnswer}`;
    element.appendChild(correctAnswerElement);

   viewScore(selectedAnswer === correctAnswer)
    scoreElement.textContent = `Score: ${score}` 

     
  });


  return element;
};





/**
 *  <input type="radio" name="answer" value="${key}">
    ${key}: ${answerText}

 */