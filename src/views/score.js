
export let score = 0;

export const viewScore = (isCorrect) => {
  if (isCorrect) {
    score += 1;
  }
};


