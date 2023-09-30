/* Program Data

  in this file you can declare variables to store important data for your program
  the data can only be primitives, objects or arrays
  do not store dom elements in these variables!!!!

  these variables will be imported by your handlers when necessary
    not by your logic
    not by your listeners
*/
import { SAVE_NAME } from './constants.js';

export const getQuizData = () => {
  const savedQuizData = localStorage.getItem(SAVE_NAME); // get the saved data from localstorage
  if (savedQuizData) {
    // check if its available
    return JSON.parse(savedQuizData); // parse from a JSON string to a JS object
  } else {
    return quizData;
  }
};

export const saveQuizData = (dataToSave) => {
  localStorage.setItem(SAVE_NAME, JSON.stringify(dataToSave));
};

export const resetLocalStorage = () => {
  localStorage.clear();
};

const quizData = {
  score: 0,
  currentQuestionIndex: 0,

  // the questions in the quiz
  questions: [
    {
      text:
        'What is the official name of the Netherlands in its native language?',
      answers: {
        a: 'Nederlanden',
        b: 'Nederlands',
        c: 'Nederland',
        d: 'Holland',
      },
      correct: 'c',
      selected: null,
    },
    {
      text:
        'Which Dutch city is famous for its canals, historic houses, and vibrant cultural scene?',
      answers: {
        a: 'Rotterdam',
        b: 'Utrecht',
        c: 'Amsterdam',
        d: 'The Hague',
      },
      correct: 'c',
      selected: null,
    },
    {
      text:
        'The Netherlands is known for its extensive system of protective dikes, dams, and barriers. What is the term commonly used to describe this system?',
      answers: {
        a: 'Waterland',
        b: 'Delta Works',
        c: 'Polder Plan',
        d: 'Floodgate Project',
      },
      correct: 'b',
      selected: null,
    },
    {
      text:
        "Which Dutch artist painted 'The Night Watch,' one of the most famous works in the Rijksmuseum in Amsterdam?",
      answers: {
        a: 'Vincent van Gogh',
        b: 'Rembrandt',
        c: 'Piet Mondrian',
        d: 'Johannes Vermeer',
      },
      correct: 'b',
      selected: null,
    },
    {
      text: 'What is the currency of the Netherlands?',
      answers: {
        a: 'Euro',
        b: 'Guilder',
        c: 'Franc',
        d: 'Mark',
      },
      correct: 'a',
      selected: null,
    },
    {
      text:
        'The Netherlands is known for its production of vibrant, colorful flower fields. What flower is particularly associated with the country?',
      answers: {
        a: 'Roses',
        b: 'Sunflowers',
        c: 'Tulips',
        d: 'Daisies',
      },
      correct: 'c',
      selected: null,
    },
    {
      text:
        'Which Dutch scientist is famous for his contributions to microbiology, including the discovery of bacteria and microscopy techniques?',
      answers: {
        a: 'Antonie van Leeuwenhoek',
        b: 'Christiaan Huygens',
        c: 'René Descartes',
        d: 'Johannes Kepler',
      },
      correct: 'a',
      selected: null,
    },
    {
      text: 'The Dutch Royal Family belongs to which dynasty?',
      answers: {
        a: 'Bourbon',
        b: 'Habsburg',
        c: 'Orange-Nassau',
        d: 'Tudor',
      },
      correct: 'c',
      selected: null,
    },
    {
      text:
        'What is the name of the Dutch parliamentary body responsible for making and passing laws?',
      answers: {
        a: 'Royal Council',
        b: 'Parliament of the Netherlands',
        c: 'States General',
        d: 'Dutch Congress',
      },
      correct: 'c',
      selected: null,
    },
    {
      text:
        "Which Dutch city is renowned for its high-tech industries, including ASML, one of the world's leading semiconductor equipment manufacturers?",
      answers: {
        a: 'Eindhoven',
        b: 'Groningen',
        c: 'Maastricht',
        d: 'Nijmegen',
      },
      correct: 'a',
      selected: null,
    },
  ],
};
