import { NORMAL_WORDS } from "../constants/normal_wordlist";
import { WORDS } from "../constants/wordlist";

export const getGameWord = () => {
  return {
    answer: NORMAL_WORDS[Math.floor(Math.random() * NORMAL_WORDS.length)].toUpperCase(),
  };
};

export const isWinningWord = (text) => {
  return answer === text;
};

export const isWordInList = (word) => {
  return NORMAL_WORDS.includes(word.toLowerCase()) || WORDS.includes(word.toLowerCase());
};

export const { answer } = getGameWord();
