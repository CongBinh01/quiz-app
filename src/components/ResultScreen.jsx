import { useLocation, useNavigate } from "react-router-dom";
import './ResultScreen.css'

const ResultScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { correctAnswers, totalQuestions, timeTaken } = location.state || {};

  const handlePlayAgain = () => {
    navigate("/quiz");
  };

  return (
    <div className="result-screen">
      <div className="result-card">
        <div className="result-icon">🏅</div>
        <h2>Congratulations!!</h2>
        <p>You are amazing!!</p>
        <p>
          {correctAnswers}/{totalQuestions} correct answers in {timeTaken} seconds.
        </p>
        <button className="play-again-btn" onClick={handlePlayAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
