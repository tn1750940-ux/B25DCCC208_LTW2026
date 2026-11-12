import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  START_SCORE,
  MIN_BET,
  MAX_BET,
  BET_STEP,
  TIME_PER_QUESTION,
  formatScore,
} from '../data';
import { validateBet, calcChange, getResult } from '../utils';
import BetPanel from '../components/BetPanel';
import QuestionCard from '../components/QuestionCard';
import Timer from '../components/Timer';
import ScoreInfo from '../components/ScoreInfo';
import Supports from '../components/Supports';

const Play = ({ questions = [], playerName = '', onSaveHistory }) => {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(START_SCORE);
  const [bet, setBet] = useState(MIN_BET);
  const [status, setStatus] = useState('betting');
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lastChange, setLastChange] = useState(0);
  const [insuredSaved, setInsuredSaved] = useState(false);
  const [rounds, setRounds] = useState([]);

  const [usedSupports, setUsedSupports] = useState({
    preview: false,
    insurance: false,
    hint: false,
  });
  const [isPreviewed, setIsPreviewed] = useState(false);
  const [isInsured, setIsInsured] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleConfirmBet = () => {
    if (validateBet(bet, score) === '') {
      setTimeLeft(TIME_PER_QUESTION);
      setSelectedAnswer(null);
      setStatus('answering');
    }
  };

  const handleReveal = (chosenIndex) => {
    if (!currentQuestion || status !== 'answering') {
      return;
    }
    const isCorrect =
      chosenIndex !== null && chosenIndex === currentQuestion.answer;
    const numBet = Number(bet);
    const savedByInsurance = !isCorrect && isInsured;
    const change = savedByInsurance
      ? 0
      : calcChange(numBet, currentQuestion.level, isCorrect);
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
    setInsuredSaved(savedByInsurance);
    setScore(scoreAfter);
    setRounds([...rounds, newRound]);
    setStatus('revealed');
  };

  useEffect(() => {
    if (!questions.length) {
      return undefined;
    }
    const qNum = currentIndex + 1;
    const total = questions.length;
    if (status === 'betting') {
      document.title = `Câu ${qNum}/${total} – đặt cược`;
    } else {
      document.title = `Câu ${qNum}/${total} – cược ${bet}`;
    }

    return () => {
      document.title = 'Đặt cược kiến thức';
    };
  }, [status, currentIndex, bet, questions.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (status !== 'betting') {
        return;
      }

      const maxValidBet =
        Math.floor(Math.min(MAX_BET, score) / BET_STEP) * BET_STEP;

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setBet((prev) => {
          const current = Number(prev) || 0;
          const next = Math.floor(current / BET_STEP) * BET_STEP + BET_STEP;
          return Math.min(maxValidBet, Math.max(MIN_BET, next));
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setBet((prev) => {
          const current = Number(prev) || MIN_BET;
          const next = Math.ceil(current / BET_STEP) * BET_STEP - BET_STEP;
          return Math.min(maxValidBet, Math.max(MIN_BET, next));
        });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (validateBet(bet, score) === '') {
          setTimeLeft(TIME_PER_QUESTION);
          setSelectedAnswer(null);
          setStatus('answering');
        }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
    };
  }, [status, bet, score]);

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
        const trimmedName = playerName.trim();

        if (onSaveHistory) {
          onSaveHistory({
            id: Date.now(),
            name: trimmedName,
            finalScore: score,
            correctCount,
            played: rounds.length,
            result: getResult(score),
            playedAt: new Date().toLocaleString('vi-VN'),
          });
        }

        navigate('/result', {
          replace: true,
          state: {
            playerName: trimmedName,
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
        setInsuredSaved(false);
        setIsPreviewed(false);
        setIsInsured(false);
        setShowHint(false);
        setStatus('betting');
      }
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [
    status,
    score,
    currentIndex,
    questions.length,
    rounds,
    playerName,
    navigate,
    onSaveHistory,
  ]);

  if (!playerName.trim()) {
    return <Navigate to="/" replace />;
  }

  if (!currentQuestion) {
    return null;
  }

  const handleUsePreview = () => {
    if (status === 'betting' && !usedSupports.preview) {
      setUsedSupports({ ...usedSupports, preview: true });
      setIsPreviewed(true);
    }
  };

  const handleUseInsurance = () => {
    if (
      (status === 'betting' || status === 'answering') &&
      !usedSupports.insurance
    ) {
      setUsedSupports({ ...usedSupports, insurance: true });
      setIsInsured(true);
    }
  };

  const handleUseHint = () => {
    if (status === 'answering' && !usedSupports.hint) {
      setUsedSupports({ ...usedSupports, hint: true });
      setShowHint(true);
    }
  };

  return (
    <div className="play-page">
      <Supports
        status={status}
        usedSupports={usedSupports}
        isInsured={isInsured}
        onUsePreview={handleUsePreview}
        onUseInsurance={handleUseInsurance}
        onUseHint={handleUseHint}
      />

      {status === 'betting' ? (
        <BetPanel
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
          questionData={currentQuestion}
          score={score}
          bet={bet}
          onBetChange={setBet}
          onConfirmBet={handleConfirmBet}
          isPreviewed={isPreviewed}
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
            showHint={showHint}
          />

          {status === 'revealed' && (
            <p
              className="change-banner"
              style={{
                color: insuredSaved
                  ? '#2563eb'
                  : lastChange >= 0
                    ? '#16a34a'
                    : '#dc2626',
                fontWeight: 'bold',
              }}
            >
              {insuredSaved
                ? 'Bảo hiểm: không bị trừ điểm'
                : lastChange >= 0
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
