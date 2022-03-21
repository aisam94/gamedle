import { WORDS } from "../constants/wordlist";

export const getGameWord = () => {
  return {
    answer: WORDS[Math.floor(Math.random() * WORDS.length)].toUpperCase(),
  };
};

export const isWinningWord = (text) => {
  return answer === text;
};

export const isWordInList = (word) => {
  return WORDS.includes(word.toLowerCase());
};

export const { answer } = getGameWord();
