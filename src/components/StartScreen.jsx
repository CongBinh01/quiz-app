import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StartScreen.css';

function StartScreen() {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/quiz');
  };

  return (
    <div className="start-screen">
      <img
        src="/robotStart.png"
        alt="Robot"
        className="robot-image"
      />
      <button onClick={handleStart} className="start-button">
        Start Quiz!
      </button>
    </div>
  );
}

export default StartScreen;