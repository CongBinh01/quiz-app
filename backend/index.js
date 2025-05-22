const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/questions", (req, res) => {
  const allQuestions = [
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
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest ocean on Earth?",
      answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
      correctAnswer: "Pacific Ocean",
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: "Au",
    },
    {
      question: "Which country is home to the kangaroo?",
      answers: ["New Zealand", "South Africa", "Australia", "Brazil"],
      correctAnswer: "Australia",
    },
    {
      question: "What is the fastest land animal?",
      answers: ["Lion", "Cheetah", "Leopard", "Tiger"],
      correctAnswer: "Cheetah",
    },
    {
      question: "How many continents are there?",
      answers: ["5", "6", "7", "8"],
      correctAnswer: "7",
    },
    {
      question: "What is the smallest country in the world?",
      answers: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
      correctAnswer: "Vatican City",
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      answers: ["Osmium", "Oxygen", "Olivine", "Ozone"],
      correctAnswer: "Oxygen",
    },
    {
      question: "What year did World War II end?",
      answers: ["1944", "1945", "1946", "1947"],
      correctAnswer: "1945",
    }
  ];
  
  // Random câu hỏi và giới hạn 10 câu
  const shuffledQuestions = allQuestions.sort(() => Math.random() - 0.5);
  const limitedQuestions = shuffledQuestions.slice(0, 10);
  
  res.json(limitedQuestions);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
