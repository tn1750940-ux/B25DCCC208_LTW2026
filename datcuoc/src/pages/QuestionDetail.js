import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LEVELS, MULTIPLIERS, LETTERS, formatMultiplier } from '../data';

const QuestionDetail = ({ questions = [], bookmarks = [], toggleBookmark }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const questionId = Number(id);
  const foundQuestion = questions.find((item) => item.id === questionId);

  if (!foundQuestion) {
    return (
      <div className="question-detail">
        <p className="error-msg">Không tìm thấy câu hỏi</p>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    );
  }

  const { topic, level, question, options, answer, hint } = foundQuestion;
  const isBookmarked = bookmarks.includes(questionId);

  return (
    <div className="question-detail">
      <h2>{`Câu hỏi số ${questionId} – ${topic} · ${LEVELS[level]} (${formatMultiplier(MULTIPLIERS[level])})`}</h2>
      <p className="question-text">{question}</p>

      <div className="options-list">
        {options.map((option, index) => {
          const isCorrect = index === answer;
          return (
            <div
              key={LETTERS[index]}
              className={`option-item ${isCorrect ? 'correct-option' : ''}`}
              style={
                isCorrect
                  ? {
                      backgroundColor: '#16a34a',
                      color: '#ffffff',
                      fontWeight: 'bold',
                    }
                  : undefined
              }
            >
              {`${LETTERS[index]}. ${option}${isCorrect ? ' (Đáp án đúng)' : ''}`}
            </div>
          );
        })}
      </div>

      <p className="hint-box">{`Gợi ý: ${hint}`}</p>

      <div className="detail-actions">
        <button
          type="button"
          className="bookmark-action-btn"
          onClick={() => toggleBookmark(questionId)}
        >
          {isBookmarked ? 'Bỏ đánh dấu' : 'Đánh dấu'}
        </button>
        <button type="button" onClick={() => navigate(-1)}>
          Quay lại
        </button>
      </div>
    </div>
  );
};

export default QuestionDetail;
