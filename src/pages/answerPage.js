import { quizData } from '../data.js';

const checkAnswer = (selectedButton) => {
  const questionIndex = quizData.currentQuestionIndex;
  const isAnswerCorrect =
    selectedButton.dataset.indexAnswer ==
    quizData.questions[questionIndex].correct;
  return isAnswerCorrect;
};

const updateSelectedAnswer = (selectedButton) => {
  const questionIndex = quizData.currentQuestionIndex;
  quizData.questions[questionIndex].selected =
    selectedButton.dataset.indexAnswer;
};

const changeButtonColor = (selectedButton, isCorrect) => {
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((button) =>
    button.classList.remove('correct-answer', 'wrong-answer')
  );
  selectedButton.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
};

const disableButtons = () => {
  const buttons = document.querySelectorAll('.answer-btn');
  buttons.forEach((button) => (button.disabled = true));
};

const storeAnswerInLocalStorage = (selectedButton) => {
  const questionIndex = quizData.currentQuestionIndex;
  const storedAnswers = JSON.parse(localStorage.getItem('userAnswers')) || {};
  storedAnswers[questionIndex] = selectedButton.dataset.indexAnswer;
  localStorage.setItem('userAnswers', JSON.stringify(storedAnswers));
};

export const selectAnswer = (selectedButton) => {
  const isAnswerCorrect = checkAnswer(selectedButton);
  updateSelectedAnswer(selectedButton);
  changeButtonColor(selectedButton, isAnswerCorrect);
  disableButtons();
  storeAnswerInLocalStorage(selectedButton);
};
