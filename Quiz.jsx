import React, { useEffect, useState } from "react";  
import "./Quiz.css";


const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Venus"],
    answer: "Jupiter",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["William Shakespeare", "Charles Dickens", "Mark Twain", "Leo Tolstoy"],
    answer: "William Shakespeare",
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    answer: "100°C",
  },
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setGameOver(true);
    }
  };

  return (
    <div className="quiz-container">
      {gameOver ? (
        <h2>Game Over! Your Score: {score}</h2>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <p>Time left: {timeLeft}s</p>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
