import React from 'react';
import { LEVELS, MULTIPLIERS, LETTERS, formatMultiplier } from '../data';
import AnswerButton from './AnswerButton';

const QuestionCard = ({
  questionNumber,
  totalQuestions,
  questionData,
  onSelectAnswer,
  status,
  selectedAnswer,
}) => {
  const { topic, level, question, options, answer } = questionData;
  const isRevealed = status === 'revealed';

  return (
    <div className="question-card">
      <h2>{`Câu ${questionNumber}/${totalQuestions} · ${topic} · ${LEVELS[level]} (${formatMultiplier(MULTIPLIERS[level])})`}</h2>
      <p className="question-text">{question}</p>

      <div className="answers-grid">
        {options.map((option, index) => (
          <AnswerButton
            key={LETTERS[index]}
            index={index}
            option={option}
            onSelect={onSelectAnswer}
            disabled={isRevealed}
            isRevealed={isRevealed}
            isSelected={selectedAnswer === index}
            isCorrect={answer === index}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
