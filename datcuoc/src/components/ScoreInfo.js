import React from 'react';
import { formatScore } from '../data';

const ScoreInfo = ({ score, bet }) => {
  return (
    <div className="score-info">
      <p>{`Điểm hiện có: ${formatScore(score)}`}</p>
      <p>{`Đang cược: ${formatScore(Number(bet))}`}</p>
    </div>
  );
};

export default ScoreInfo;
