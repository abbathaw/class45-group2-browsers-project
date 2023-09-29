import { USER_INTERFACE_ID } from '../constants.js';
import { createResultElement } from '../views/resultView.js';

export const showResultPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const resultElement = createResultElement();
  userInterface.appendChild(resultElement);
};
