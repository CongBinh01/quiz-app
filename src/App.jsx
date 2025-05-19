import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import ReviewScreen from './components/ReviewScreen';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/result" element={<ResultScreen />} />
        <Route path="/review" element={<ReviewScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
