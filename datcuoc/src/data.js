export const LEVELS = { 1: 'Dễ', 2: 'Trung bình', 3: 'Khó' };

// Hệ số thưởng theo mức độ: trả lời đúng được (mức cược × hệ số)
export const MULTIPLIERS = { 1: 1, 2: 1.5, 3: 2 };

export const LETTERS = ['A', 'B', 'C', 'D'];

export const START_SCORE = 1000;
export const MIN_BET = 100;
export const MAX_BET = 500;
export const BET_STEP = 100;
export const TIME_PER_QUESTION = 25;

// Đánh giá theo điểm cuối, xếp từ cao xuống thấp
export const RESULTS = [
  { min: 2000, title: 'Thắng lớn' },
  { min: 1001, title: 'Có lãi' },
  { min: 1000, title: 'Hòa vốn' },
  { min: 100, title: 'Thua lỗ' },
  { min: 0, title: 'Cháy túi' },
];

export const formatScore = (n) => `${n.toLocaleString('vi-VN')} điểm`;

export const formatMultiplier = (m) => `x${m.toLocaleString('vi-VN')}`;
