import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResultScreen.css";

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { correctAnswers, totalQuestions, timeTaken } = location.state || {
    correctAnswers: 0,
    totalQuestions: 0,
    timeTaken: 0,
  };

  const success = correctAnswers >= totalQuestions / 2;

  return (
    <div className="result-container">
      <div className="result-box">
        <img
          src={
            success
              ? "/medal.png" 
              : "/greenRepeat.jpg"   
          }
          alt="result-icon"
          className="result-icon"
        />

        <h2>{success ? "Congratulations!!" : "Completed!"}</h2>
        <p>
          {success
            ? "You are amazing!!"
            : "Better luck next time!"}
        </p>
        <p>
          {correctAnswers}/{totalQuestions} correct answers in {timeTaken} seconds.
        </p>

        <button className="play-again-button" onClick={() => navigate("/")}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
