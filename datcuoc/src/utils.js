import { MIN_BET, MAX_BET, BET_STEP, MULTIPLIERS, RESULTS } from './data';

export const validateBet = (bet, score) => {
  const numBet = Number(bet);
  if (
    bet === '' ||
    bet === null ||
    bet === undefined ||
    Number.isNaN(numBet) ||
    !Number.isInteger(numBet) ||
    numBet < MIN_BET ||
    numBet > MAX_BET ||
    numBet > score ||
    numBet % BET_STEP !== 0
  ) {
    return 'Mức cược phải là bội số của 100, từ 100 đến 500 và không vượt quá số điểm đang có';
  }
  return '';
};

export const calcChange = (bet, level, correct) => {
  const numBet = Number(bet);
  if (correct) {
    return numBet * MULTIPLIERS[level];
  }
  return -numBet;
};

export const getResult = (score) => {
  const found = RESULTS.find(({ min }) => score >= min);
  return found ? found.title : '';
};
