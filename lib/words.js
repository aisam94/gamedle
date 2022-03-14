import { WORDS } from "../constant/wordlist";

export const getWordOfTheDay = () => {
  // January 1, 2022 Game Epoch
  const epochMs = new Date(2022, 0).valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  const nextday = (index + 1) * msInDay + epochMs;

  return {
    // solution: localeAwareUpperCase(WORDS[index % WORDS.length]),
    answer: WORDS[index % WORDS.length].toUpperCase(),
    answerIndex: index,
    tomorrow: nextday,
  }; //
};

export const isWinningWord = (text) => {
  return answer === text;
};

export const isWordInList = (word) => {
  return WORDS.includes(word.toLowerCase());
};

export const { answer, answerIndex, tomorrow } = getWordOfTheDay();
