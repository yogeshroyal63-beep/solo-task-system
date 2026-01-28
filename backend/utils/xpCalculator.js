export const getXPForDifficulty = (difficulty) => {
  switch (difficulty) {
    case "hard":
      return 400;
    case "medium":
      return 250;
    default:
      return 120;
  }
};

export const calculateLevel = (xp) => {
  return Math.floor(xp / 1000) + 1;
};
