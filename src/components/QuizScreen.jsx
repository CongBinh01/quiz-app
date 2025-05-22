import React, { useState, useEffect } from "react";
import "./QuizScreen.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizScreen = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [startTime, setStartTime] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    // Fetch API
    axios.get("http://localhost:5000/api/questions")
      .then(res => {
        setQuestions(res.data);
        setStartTime(Date.now());
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const question = questions[currentQuestionIndex];

  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowNext(true);

    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(selectedAnswers[currentQuestionIndex + 1] || null);
      setShowNext(selectedAnswers[currentQuestionIndex + 1] ? true : false);
    } else {
      const correctCount = questions.reduce((acc, q, i) => {
        if (selectedAnswers[i] === q.correctAnswer) return acc + 1;
        return acc;
      }, 0);

      const timeTakenInSeconds = Math.floor((Date.now() - startTime) / 1000);

      navigate("/result", {
        state: {
          correctAnswers: correctCount,
          totalQuestions: questions.length,
          timeTaken: timeTakenInSeconds,
        },
      });
    }
  };

  if (loading) return <div className="quiz-container">Loading...</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div>
          <h3>Question {currentQuestionIndex + 1}</h3>
          <p>{question?.question}</p>
        </div>
        <button className="close-btn" onClick={() => navigate("/")}>
          ×
        </button>
      </div>

      <div className="answers-container">
        {question?.answers?.map((answer, index) => (
          <div
            key={index}
            className={`answer-option ${selectedAnswer === answer ? "selected" : ""}`}
            onClick={() => handleSelectAnswer(answer)}
          >
            <span>{answer}</span>
            <span className="custom-radio"></span>
          </div>
        ))}
      </div>

      <button
        className={`next-button ${showNext ? "active" : ""}`}
        onClick={handleNext}
        disabled={!showNext}
      >
        {currentQuestionIndex === questions.length - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
};

export default QuizScreen;
