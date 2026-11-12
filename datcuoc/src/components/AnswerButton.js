import React from 'react';
import { LETTERS } from '../data';

const AnswerButton = ({
  index,
  option,
  onSelect,
  disabled,
  isRevealed,
  isSelected,
  isCorrect,
}) => {
  let buttonStyle = {};
  if (isRevealed) {
    if (isCorrect) {
      buttonStyle = {
        backgroundColor: '#16a34a',
        color: '#ffffff',
        borderColor: '#15803d',
      };
    } else if (isSelected) {
      buttonStyle = {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        borderColor: '#b91c1c',
      };
    }
  }

  return (
    <button
      type="button"
      className="answer-btn"
      style={buttonStyle}
      disabled={disabled}
      onClick={() => onSelect(index)}
    >
      {`${LETTERS[index]}. ${option}`}
    </button>
  );
};

export default AnswerButton;
