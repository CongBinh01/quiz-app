import React, { useState, useEffect } from "react";
import "./QuizScreen.css";
import { useNavigate } from "react-router-dom";

const QuizScreen = () => {
  const navigate = useNavigate();

  // 1. Giả lập dữ liệu câu hỏi
  const [questions, setQuestions] = useState([
    {
      question: "What is the capital of France?",
      answers: ["Berlin", "London", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "What is 2 + 2?",
      answers: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    // Bạn có thể thêm câu hỏi ở đây
  ]);

  // 2. State để lưu thời gian bắt đầu
  const [startTime, setStartTime] = useState(null);

  // 3. State lưu index câu hỏi hiện tại
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 4. State lưu câu trả lời đã chọn cho câu hỏi hiện tại
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // 5. State lưu tất cả câu trả lời người dùng đã chọn
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  // 6. Hiện nút next khi đã chọn câu trả lời
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const question = questions[currentQuestionIndex];

  // Xử lý khi chọn đáp án
  const handleSelectAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowNext(true);

    // Cập nhật mảng selectedAnswers
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(updatedAnswers);
  };

  // Xử lý nút Next
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(selectedAnswers[currentQuestionIndex + 1] || null);
      setShowNext(selectedAnswers[currentQuestionIndex + 1] ? true : false);
    } else {
      // Tính số câu trả lời đúng
      const correctCount = questions.reduce((acc, q, i) => {
        if (selectedAnswers[i] === q.correctAnswer) return acc + 1;
        return acc;
      }, 0);

      // Tính thời gian làm bài (giây)
      const timeTakenInSeconds = Math.floor((Date.now() - startTime) / 1000);

      // Chuyển trang kết quả kèm data
      navigate("/result", {
        state: {
          correctAnswers: correctCount,
          totalQuestions: questions.length,
          timeTaken: timeTakenInSeconds,
        },
      });
    }
  };

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
            className={`answer-option ${
              selectedAnswer === answer ? "selected" : ""
            }`}
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
