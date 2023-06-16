import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Button from '@mui/material/Button';

import robotImage from '../robot.png';
import userImage from '../user.png';

function QuizPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const level = queryParams.get('level');

  const [selectedCategory, setSelectedCategory] = useState(category || '');
  const [selectedLevel, setSelectedLevel] = useState(level || '');
  const [quizzes, setQuizzes] = useState([]);
  const [results, setResults] = useState({});
  const [userAnswers, setUserAnswers] = useState({});
  const [robotAnswers, setRobotAnswers] = useState({});
  const [round, setRound] = useState(1);
  const [showQuiz, setShowQuiz] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [winner, setWinner] = useState('');
  const [userRoundWins, setUserRoundWins] = useState(0);
  const [robotRoundWins, setRobotRoundWins] = useState(0);
  const [roundAnswers, setRoundAnswers] = useState({});

  const maxRounds = 3;

  useEffect(() => {
    setSelectedCategory(category || '');
    setSelectedLevel(level || '');
  }, [category, level]);

  useEffect(() => {
    if (selectedCategory && selectedLevel) {
      fetchQuizzes();
    }
  }, [selectedCategory, selectedLevel]);

  async function fetchQuizzes() {
    try {
      const response = await fetch(
        `http://localhost:3005/quiz/a?category=${selectedCategory}&level=${selectedLevel}`
      );
      const data = await response.json();
      setQuizzes(data);
      setResults({});
      setUserAnswers({});
      setRobotAnswers({});
      setShowQuiz(true);
      setShowResult(false);
      setTotalScore(0);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  }

  const handleOptionChange = (questionId, optionIndex) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionIndex,
    }));

    setRoundAnswers((prevAnswers) => ({
      ...prevAnswers,
      [round]: true,
    }));
  };

  const handleSubmit = async (questionId) => {
    const userAnswer = userAnswers[questionId];
    const question = quizzes.find((quiz) => quiz.id === questionId);
    const correctAnswer = question.options.findIndex((option) => option === question.answer);

    let robotAnswer;
    let robotResult;

    if (selectedLevel === 'easy') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 30;
    } else if (selectedLevel === 'medium') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 50;
    } else if (selectedLevel === 'difficult') {
      robotAnswer = Math.floor(Math.random() * 100) + 1;
      robotResult = robotAnswer < 70;
    }

    setResults((prevResults) => ({
      ...prevResults,
      [questionId]: userAnswer === correctAnswer,
    }));

    setRobotAnswers((prevRobotAnswers) => ({
      ...prevRobotAnswers,
      [questionId]: {
        answer: robotAnswer,
        result: robotResult,
      },
    }));

    setShowResult(true);
    setShowQuiz(false);
  };

  const handleNextRound = () => {
    if (round === maxRounds) {
      handleFinishQuiz();
    } else {
      setRound((prevRound) => prevRound + 1);
      setShowQuiz(true);
      setShowResult(false);
      setUserAnswers({});
      setRobotAnswers({});

      if (!roundAnswers[round]) {
        const roundQuestions = quizzes.filter(
          (quiz) => quiz.category === selectedCategory && quiz.level === selectedLevel
        );

        const roundResults = roundQuestions.reduce((acc, question) => {
          acc[question.id] = false;
          return acc;
        }, {});

        setResults((prevResults) => ({
          ...prevResults,
          ...roundResults,
        }));

        setRobotAnswers((prevRobotAnswers) => ({
          ...prevRobotAnswers,
          ...roundResults,
        }));
      }

      setRoundAnswers((prevAnswers) => ({
        ...prevAnswers,
        [round]: false,
      }));
    }
  };

  const handleFinishQuiz = () => {
    setShowQuiz(false);
    setShowResult(false);

    const userScore = Object.values(results).reduce((acc, result) => {
      return result ? acc + 1 : acc;
    }, 0);

    const robotScore = Object.values(robotAnswers).reduce((acc, answer) => {
      return answer.result ? acc + 1 : acc;
    }, 0);

    setTotalScore(userScore);

    if (userScore > robotScore) {
      setWinner('user');
      setUserRoundWins((prevWins) => prevWins + 1);
    } else if (robotScore > userScore) {
      setWinner('robot');
      setRobotRoundWins((prevWins) => prevWins + 1);
    } else {
      setWinner('tie');
    }
  };

  return (
    <div className="quiz-page">
      <h1>Quiz Page</h1>
      <div className="quiz-controls">
        <div className="category-selector">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {/* Category options */}
          </select>
        </div>
        <div className="level-selector">
          <label htmlFor="level">Level:</label>
          <select
            id="level"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="difficult">Difficult</option>
          </select>
        </div>
        <Button
          variant="contained"
          color="primary"
          disabled={!selectedCategory || !selectedLevel}
          onClick={fetchQuizzes}
        >
          Start Quiz
        </Button>
      </div>

      {showQuiz && (
        <div className="quiz-container">
          <h2>Round {round}</h2>
          {quizzes
            .filter((quiz) => quiz.category === selectedCategory && quiz.level === selectedLevel)
            .map((quiz) => (
              <div className="question" key={quiz.id}>
                <h3>{quiz.question}</h3>
                {quiz.options.map((option, index) => (
                  <div className="option" key={index}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${quiz.id}`}
                        checked={userAnswers[quiz.id] === index}
                        onChange={() => handleOptionChange(quiz.id, index)}
                      />
                      {option}
                    </label>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  disabled={typeof userAnswers[quiz.id] === 'undefined'}
                  onClick={() => handleSubmit(quiz.id)}
                >
                  Submit
                </Button>
              </div>
            ))}
        </div>
      )}

      {showResult && (
        <div className="result-container">
          <h2>Round {round} Result</h2>
          {quizzes
            .filter((quiz) => quiz.category === selectedCategory && quiz.level === selectedLevel)
            .map((quiz) => (
              <div className="question-result" key={quiz.id}>
                <h3>{quiz.question}</h3>
                <div className="result">
                  <div className="user">
                    <img src={userImage} alt="User" />
                    {results[quiz.id] ? (
                      <span className="correct">Correct</span>
                    ) : (
                      <span className="incorrect">Incorrect</span>
                    )}
                  </div>
                  <div className="robot">
                    <img src={robotImage} alt="Robot" width={120} />
                    {robotAnswers[quiz.id].result ? (
                      <span className="correct">Correct</span>
                    ) : (
                      <span className="incorrect">Incorrect</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <Button variant="contained" color="primary" onClick={handleNextRound}>
            Next Round
          </Button>
        </div>
      )}

      {!showQuiz && !showResult && (
        <div className="final-result">
          <h2>Quiz Finished!</h2>
          <h3>Total Score: {totalScore}</h3>
          <h3>Winner: {winner === 'user' ? 'User' : winner === 'robot' ? 'Robot' : 'Tie'}</h3>
          {round === maxRounds && (
            <div>
              <h3>User Round Wins: {userRoundWins}</h3>
              <h3>Robot Round Wins: {robotRoundWins}</h3>
            </div>
          )}
        
        </div>
      )}
    </div>
  );
}

export default QuizPage;
