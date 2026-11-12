import React from 'react';
import { useLocation, useNavigate, Navigate } from 'react-router-dom';
import { MIN_BET, formatScore } from '../data';
import { getResult } from '../utils';
import ScoreChart from '../components/ScoreChart';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();

  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  const {
    playerName,
    rounds = [],
    finalScore = 0,
    correctCount = 0,
    reason,
  } = location.state;

  const isBankrupt = reason === 'bankrupt' || finalScore < MIN_BET;

  return (
    <div className="result-page">
      <h2>
        {isBankrupt ? 'Bạn đã cháy túi!' : 'Bạn đã hoàn thành 12 câu.'}
      </h2>

      <div className="result-summary">
        <p>{`Người chơi: ${playerName}`}</p>
        <p>{`Số câu trả lời đúng: ${correctCount}/${rounds.length}`}</p>
        <p>{`Điểm cuối: ${formatScore(finalScore)}`}</p>
        <p>{`Đánh giá: ${getResult(finalScore)}`}</p>
      </div>

      <ScoreChart rounds={rounds} />

      <div className="result-actions">
        <button
          type="button"
          className="primary-btn"
          onClick={() => navigate('/play')}
        >
          Chơi lại
        </button>
        <button type="button" onClick={() => navigate('/')}>
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Result;
