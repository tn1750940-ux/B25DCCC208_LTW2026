import React from 'react';
import { LEVELS, MULTIPLIERS, formatScore, formatMultiplier } from '../data';
import { validateBet } from '../utils';

const BetPanel = ({
  questionNumber,
  totalQuestions,
  questionData,
  score,
  bet,
  onBetChange,
  onConfirmBet,
}) => {
  const { topic, level } = questionData;
  const errorMsg = validateBet(bet, score);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errorMsg) {
      onConfirmBet();
    }
  };

  return (
    <div className="bet-panel">
      <h2>{`Câu ${questionNumber}/${totalQuestions} · ${topic} · ${LEVELS[level]} (${formatMultiplier(MULTIPLIERS[level])})`}</h2>
      <p className="score-line">{`Điểm hiện có: ${formatScore(score)}`}</p>

      <form className="bet-form" onSubmit={handleSubmit}>
        <label htmlFor="bet-input">Mức cược:</label>
        <input
          id="bet-input"
          type="number"
          value={bet}
          onChange={(e) => onBetChange(e.target.value)}
        />
        <button type="submit" className="primary-btn" disabled={Boolean(errorMsg)}>
          Đặt cược
        </button>
      </form>

      {errorMsg && (
        <p className="error-msg" style={{ color: '#dc2626' }}>
          {errorMsg}
        </p>
      )}
    </div>
  );
};

export default BetPanel;
