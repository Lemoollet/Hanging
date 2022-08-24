const randomWords = [
  'COMPUTADORA',
  'AGUACATE',
  'NUTRIOLOGO',
  'GYM',
  'AYUDA',
  'AHORCADO',
];

export const getRandomWord = (): string => {
  let word = Math.floor(Math.random() * randomWords.length);
  return randomWords[word];
};
