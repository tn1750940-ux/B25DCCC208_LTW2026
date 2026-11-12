import React from 'react';

const Timer = ({ timeLeft }) => {
  return (
    <div
      className="timer-box"
      style={{
        color: timeLeft <= 5 ? '#dc2626' : '#0f172a',
        fontWeight: 'bold',
      }}
    >
      {`Còn ${timeLeft} giây`}
    </div>
  );
};

export default Timer;
