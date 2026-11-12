import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, formatMultiplier } from '../data';

const QuestionBank = ({ questions = [], bookmarks = [], toggleBookmark }) => {
  const [selectedLevels, setSelectedLevels] = useState([1, 2, 3]);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleLevelChange = (levelNum) => {
    if (selectedLevels.includes(levelNum)) {
      setSelectedLevels(selectedLevels.filter((lv) => lv !== levelNum));
    } else {
      setSelectedLevels([...selectedLevels, levelNum]);
    }
  };

  const filteredQuestions = questions.filter(({ id, level, question }) => {
    const matchLevel = selectedLevels.includes(level);
    const matchBookmark = !onlyBookmarked || bookmarks.includes(id);
    const matchSearch = question
      .toLowerCase()
      .includes(searchKeyword.trim().toLowerCase());
    return matchLevel && matchBookmark && matchSearch;
  });

  return (
    <div className="question-bank">
      <h2>Ngân hàng câu hỏi</h2>

      <div className="filter-bar">
        <div className="filter-group">
          <span>Mức độ:</span>
          {[1, 2, 3].map((lv) => (
            <label key={lv} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedLevels.includes(lv)}
                onChange={() => handleLevelChange(lv)}
              />
              {LEVELS[lv]}
            </label>
          ))}
        </div>

        <div className="filter-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={onlyBookmarked}
              onChange={(e) => setOnlyBookmarked(e.target.checked)}
            />
            Chỉ hiện câu đã đánh dấu
          </label>
        </div>

        <div className="filter-group">
          <label htmlFor="question-search">Tìm kiếm:</label>
          <input
            id="question-search"
            type="text"
            placeholder="Nhập nội dung câu hỏi..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="summary-bar">
        <p>{`Có ${filteredQuestions.length} câu hỏi`}</p>
        <p>{`Đã đánh dấu: ${bookmarks.length} câu`}</p>
      </div>

      <table className="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Chủ đề</th>
            <th>Mức độ</th>
            <th>Hệ số</th>
            <th>Câu hỏi</th>
            <th>Đánh dấu</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map(({ id, topic, level, question }) => {
            const isBookmarked = bookmarks.includes(id);
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{topic}</td>
                <td>{LEVELS[level]}</td>
                <td>{formatMultiplier(MULTIPLIERS[level])}</td>
                <td>
                  <Link to={`/questions/${id}`}>{question}</Link>
                </td>
                <td className="center-cell">
                  <button
                    type="button"
                    className={`star-btn ${isBookmarked ? 'active-star' : ''}`}
                    onClick={() => toggleBookmark(id)}
                  >
                    {isBookmarked ? '★' : '☆'}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
