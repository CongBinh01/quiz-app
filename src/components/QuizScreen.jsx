import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./QuizScreen.css";

const sampleQuestions = [
  {
    question:
      "In any programming language, what is the most common way to iterate through an array?",
    answers: [
      "'For' loops",
      "'If' Statements",
      "'While' loops",
      "'Do-while' loops",
    ],
    correctAnswer: "'For' loops",
  },
];

const QuizScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    setQuestions(sampleQuestions);
  }, []);

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      alert("Quiz completed!");
    }
  };
  const handleQuit = () => {
  navigate("/");
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion) return <div>Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h3>
          Question {currentQuestionIndex + 1}/{questions.length}
        </h3>
        <p>{currentQuestion.question}</p>
        <button className="close-btn" onClick={handleQuit}>×</button>
      </div>

      <div className="answers-container">
        {currentQuestion.answers.map((answer, index) => (
          <div
            key={index}
            className={`answer-option ${
              selectedAnswer === answer ? "selected" : ""
            }`}
            onClick={() => handleSelectAnswer(answer)}
          >
            <span>{answer}</span>
            <span className="custom-radio" />
          </div>
        ))}
      </div>

      <button
        className={`next-button ${selectedAnswer ? "active" : ""}`}
        onClick={handleNext}
        disabled={!selectedAnswer}
      >
        Next
      </button>
    </div>
  );
};

export default QuizScreen;
