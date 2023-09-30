import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');

  element.innerHTML = String.raw`
  
   <h1 id="title"> The Netherlands Discovery Quiz </h1>
   <button id="${START_QUIZ_BUTTON_ID}">START QUIZ</button>
   `;
  return element;
};
