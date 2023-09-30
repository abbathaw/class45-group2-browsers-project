import { getQuizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { initQuestionPage } from './pages/questionPage.js';

const loadApp = () => {
  const quizData = getQuizData();
  if (quizData.currentQuestionIndex === 0) {
    initWelcomePage();
  } else {
    initQuestionPage();
  }
};

window.addEventListener('load', loadApp);
