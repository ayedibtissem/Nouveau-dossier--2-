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

    const score = userAnswer === correctAnswer ? 1 : 0;
    setTotalScore((prevScore) => prevScore + score);
  };

  const handleNextRound = () => {
    setRound((prevRound) => prevRound + 1);
    setRoundAnswers({});
    setShowQuiz(true);
    setShowResult(false);
  };

  useEffect(() => {
    if (round > maxRounds) {
      if (userRoundWins > robotRoundWins) {
        setWinner('user');
      } else if (userRoundWins < robotRoundWins) {
        setWinner('robot');
      } else {
        setWinner('tie');
      }
      setShowQuiz(false);
      setShowResult(true);
    }
  }, [round, userRoundWins, robotRoundWins]);

  const handleRoundResult = () => {
    const roundScore = Object.values(results).reduce((total, result) => total + (result ? 1 : 0), 0);
    const robotRoundScore = Object.values(robotAnswers).reduce(
      (total, answer) => total + (answer.result ? 1 : 0),
      0
    );

    if (roundScore > robotRoundScore) {
      setUserRoundWins((prevWins) => prevWins + 1);
    } else if (roundScore < robotRoundScore) {
      setRobotRoundWins((prevWins) => prevWins + 1);
    }
  };

  return (
    <div>
      {showQuiz && (
        <div>
          <h2>Round {round}</h2>
          <h3>Category: {selectedCategory}</h3>
          <h3>Level: {selectedLevel}</h3>
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <h4>{quiz.question}</h4>
              {quiz.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={index}
                    name={quiz.id}
                    value={index}
                    checked={userAnswers[quiz.id] === index}
                    onChange={() => handleOptionChange(quiz.id, index)}
                  />
                  <label htmlFor={index}>{option}</label>
                </div>
              ))}
              <Button variant="contained" onClick={() => handleSubmit(quiz.id)}>Submit</Button>
            </div>
          ))}
          <Button variant="contained" onClick={handleNextRound}>Next Round</Button>
        </div>
      )}
      {showResult && (
        <div>
          <h2>Results</h2>
          {quizzes.map((quiz) => (
            <div key={quiz.id}>
              <h4>{quiz.question}</h4>
              <p>Your Answer: {quiz.options[userAnswers[quiz.id]]}</p>
              <p>
                Robot Answer: {robotAnswers[quiz.id].answer}{' '}
                {robotAnswers[quiz.id].result ? '(Correct)' : '(Incorrect)'}
              </p>
              <p>
                Result:{' '}
                {results[quiz.id] ? (
                  <span style={{ color: 'green' }}>Correct</span>
                ) : (
                  <span style={{ color: 'red' }}>Incorrect</span>
                )}
              </p>
            </div>
          ))}
          <h3>Total Score: {totalScore}</h3>
          <h3>Winner: {winner}</h3>
        </div>
      )}
      <Link to="/">Back to Home</Link>
      <img src={userImage} alt="User" />
      <img src={robotImage} alt="Robot" />
      <Button variant="contained" onClick={handleRoundResult}>Get Round Result</Button>
    </div>
  );
}

export default QuizPage;
