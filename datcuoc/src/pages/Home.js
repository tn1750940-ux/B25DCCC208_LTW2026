import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  START_SCORE,
  MIN_BET,
  MAX_BET,
  TIME_PER_QUESTION,
  formatScore,
} from '../data';

const Home = ({ playerName = '', onPlayerNameChange }) => {
  const navigate = useNavigate();

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      navigate('/play');
    }
  };

  return (
    <div className="home-page">
      <h1>Đặt cược kiến thức</h1>

      <div className="rules-box">
        <h3>Luật chơi</h3>
        <ul>
          <li>
            {`Người chơi bắt đầu với ${formatScore(START_SCORE)} và đi qua 12 câu hỏi về HTML, CSS, JavaScript và React.`}
          </li>
          <li>
            {`Trước mỗi câu, chỉ hiển thị chủ đề, mức độ và hệ số thưởng. Người chơi đặt cược từ ${formatScore(MIN_BET)} đến ${formatScore(MAX_BET)} (bội số của 100, không vượt quá số điểm đang có).`}
          </li>
          <li>
            {`Sau khi đặt cược, câu hỏi hiện ra và có ${TIME_PER_QUESTION} giây để trả lời.`}
          </li>
          <li>
            Trả lời đúng được cộng mức cược nhân hệ số mức độ (Dễ x1, Trung bình x1,5, Khó x2). Sai hoặc hết giờ bị trừ đúng mức cược.
          </li>
          <li>
            {`Lượt chơi kết thúc khi hoàn thành 12 câu hoặc khi số điểm còn dưới ${formatScore(MIN_BET)} (cháy túi).`}
          </li>
        </ul>
      </div>

      <form className="start-form" onSubmit={handleStartGame}>
        <label htmlFor="player-name">Tên người chơi:</label>
        <input
          id="player-name"
          type="text"
          placeholder="Nhập tên của bạn..."
          value={playerName}
          onChange={(e) => onPlayerNameChange(e.target.value)}
        />
        <button
          type="submit"
          className="primary-btn"
          disabled={!playerName.trim()}
        >
          Vào chơi
        </button>
      </form>
    </div>
  );
};

export default Home;
