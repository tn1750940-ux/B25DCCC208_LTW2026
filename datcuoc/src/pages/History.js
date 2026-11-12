import React, { useState } from 'react';
import { MIN_BET, formatScore } from '../data';

const History = ({ history = [], onClearHistory }) => {
  const [selectedPlayer, setSelectedPlayer] = useState('Tất cả');

  if (history.length === 0) {
    return (
      <div className="history-page">
        <h2>Lịch sử các lượt chơi</h2>
        <p className="empty-msg">Chưa có lượt chơi nào.</p>
      </div>
    );
  }

  const uniquePlayers = [...new Set(history.map(({ name }) => name))];

  const filteredHistory =
    selectedPlayer === 'Tất cả'
      ? history
      : history.filter(({ name }) => name === selectedPlayer);

  const sortedHistory = [...filteredHistory].sort(
    (a, b) => b.finalScore - a.finalScore
  );

  const totalPlays = sortedHistory.length;
  const highestScore = sortedHistory.reduce(
    (max, { finalScore }) => (finalScore > max ? finalScore : max),
    0
  );
  const bankruptCount = sortedHistory.filter(
    ({ result, finalScore }) => result === 'Cháy túi' || finalScore < MIN_BET
  ).length;

  return (
    <div className="history-page">
      <h2>Lịch sử các lượt chơi</h2>

      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="player-filter">Người chơi:</label>
          <select
            id="player-filter"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="Tất cả">Tất cả</option>
            {uniquePlayers.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="danger-btn"
          onClick={() => {
            setSelectedPlayer('Tất cả');
            onClearHistory();
          }}
        >
          Xóa lịch sử
        </button>
      </div>

      <div className="stats-box">
        <p>{`Số lượt chơi: ${totalPlays}`}</p>
        <p>{`Điểm cao nhất: ${formatScore(highestScore)}`}</p>
        <p>{`Số lần cháy túi: ${bankruptCount}`}</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>Người chơi</th>
            <th>Số câu đúng</th>
            <th>Điểm cuối</th>
            <th>Đánh giá</th>
            <th>Thời gian</th>
          </tr>
        </thead>
        <tbody>
          {sortedHistory.map(
            ({ id, name, correctCount, played, finalScore, result, playedAt }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{`${correctCount}/${played}`}</td>
                <td>{formatScore(finalScore)}</td>
                <td>{result}</td>
                <td>{playedAt}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
