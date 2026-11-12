import React from 'react';
import { formatScore } from '../data';

const ScoreChart = ({ rounds = [] }) => {
  const maxScore = rounds.reduce(
    (max, { scoreAfter }) => (scoreAfter > max ? scoreAfter : max),
    0
  );

  return (
    <div className="score-chart-wrapper">
      <h3>Biểu đồ điểm qua từng câu</h3>
      <div className="score-chart">
        {rounds.map(({ id, scoreAfter, correct }, index) => {
          const barHeight =
            maxScore > 0 ? Math.round((scoreAfter / maxScore) * 200) : 0;
          return (
            <div key={id} className="chart-column">
              <span className="chart-score">{formatScore(scoreAfter)}</span>
              <div
                className="chart-bar"
                style={{
                  height: `${barHeight}px`,
                  backgroundColor: correct ? '#16a34a' : '#dc2626',
                }}
              />
              <span className="chart-label">{`Câu ${index + 1}`}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreChart;
