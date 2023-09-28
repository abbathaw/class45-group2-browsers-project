import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
// import { help }
const loadApp = () => {
  quizData.currentQuestionIndex = 0;
  // *Abdullah code
  const userAnswers = localStorage.getItem('userAnswers');

  if (userAnswers) {
    const keys = Object.keys(JSON.parse(userAnswers));
    const lastObj = keys[keys.length - 1];
    quizData.currentQuestionIndex = lastObj;
    // method(help)
  } else {
    quizData.currentQuestionIndex = 0;
    initWelcomePage();
  }
};

window.addEventListener('load', loadApp);
