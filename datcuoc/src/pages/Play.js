import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  START_SCORE,
  MIN_BET,
  TIME_PER_QUESTION,
  formatScore,
} from '../data';
import { validateBet, calcChange } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';

const Play = ({ questions = [], playerName = '' }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [bet, setBet] = useState(MIN_BET);
  const [status, setStatus] = useState('betting');
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lastChange, setLastChange] = useState(0);
  const [rounds, setRounds] = useState([]);

  const currentQuestion = questions[currentIndex];

  const handleReveal = (chosenIndex) => {
    if (!currentQuestion || status !== 'answering') {
      return;
    }
    const isCorrect =
      chosenIndex !== null && chosenIndex === currentQuestion.answer;
    const numBet = Number(bet);
    const change = calcChange(numBet, currentQuestion.level, isCorrect);
    const scoreAfter = score + change;
    const newRound = {
      id: currentQuestion.id,
      bet: numBet,
      correct: isCorrect,
      change,
      scoreAfter,
    };

    setSelectedAnswer(chosenIndex);
    setLastChange(change);
    setScore(scoreAfter);
    setRounds([...rounds, newRound]);
    setStatus('revealed');
  };

  useEffect(() => {
    if (status !== 'answering') {
      return undefined;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [status, currentIndex]);

  useEffect(() => {
    if (status === 'answering' && timeLeft === 0) {
      handleReveal(null);
    }
  });

  useEffect(() => {
    if (status !== 'revealed') {
      return undefined;
    }

    const timeoutId = setTimeout(() => {
      const isBankrupt = score < MIN_BET;
      const isFinished = currentIndex + 1 >= questions.length;

      if (isBankrupt || isFinished) {
        const correctCount = rounds.filter(({ correct }) => correct).length;
        const reason = isBankrupt ? 'bankrupt' : 'completed';
        navigate('/result', {
          replace: true,
          state: {
            playerName: playerName.trim(),
            rounds,
            finalScore: score,
            correctCount,
            reason,
          },
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
        setBet(MIN_BET);
        setTimeLeft(TIME_PER_QUESTION);
        setSelectedAnswer(null);
        setLastChange(0);
        setStatus('betting');
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [status, score, currentIndex, questions.length, rounds, playerName, navigate]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) {
    return null;
  }

  const handleConfirmBet = () => {
    if (validateBet(bet, score) === '') {
      setTimeLeft(TIME_PER_QUESTION);
      setSelectedAnswer(null);
      setStatus('answering');
    }
  };

  return (
    <div className="play-page">
      {status === 'betting' ? (
        <BetPanel
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          questionData={currentQuestion}
          score={score}
          bet={bet}
          onBetChange={setBet}
          onConfirmBet={handleConfirmBet}
        />
      ) : (
        <div className="answering-section">
          <div className="top-bar">
            <ScoreInfo score={score} bet={bet} />
            <Timer timeLeft={timeLeft} />
          </div>

          <QuestionCard
            questionNumber={currentIndex + 1}
            totalQuestions={questions.length}
            questionData={currentQuestion}
            onSelectAnswer={handleReveal}
            status={status}
            selectedAnswer={selectedAnswer}
          />

          {status === 'revealed' && (
            <p
              className="change-banner"
              style={{
                color: lastChange >= 0 ? '#16a34a' : '#dc2626',
                fontWeight: 'bold',
              }}
            >
              {lastChange >= 0
                ? `+${formatScore(lastChange)}`
                : `−${formatScore(Math.abs(lastChange))}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Play;
