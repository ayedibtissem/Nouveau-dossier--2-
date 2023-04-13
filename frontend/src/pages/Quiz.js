import React, { useState } from 'react';

function Quiz({ quiz }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [correct, setCorrect] = useState([]);

  const handleClick = (questionIndex, choiceIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = choiceIndex;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const quizCorrect = [];
    quiz.questions.forEach((question, index) => {
      const correctIndex = question.choices.findIndex(choice => choice === question.correctAnswer);
      const isCorrect = userAnswers[index] === correctIndex;
      quizCorrect.push(isCorrect);
    });
    setCorrect(quizCorrect);
  };

  const getScore = () => {
    const numCorrect = correct.filter(Boolean).length;
    const totalQuestions = quiz.questions.length;
    const score = (numCorrect / totalQuestions) * 100;
    return score;
  }

  const score = getScore();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px',color:"red" }}>{quiz.title}</h1>
      <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
        {quiz.questions.map((question, questionIndex) => (
          <li key={question._id} style={{ marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '10px' }}>{question.text}</h3>
            <div id="choices" style={{ display: 'flex', flexDirection: 'column' }}>
              {question.choices.map((choice, choiceIndex) => (
                <div key={choiceIndex} style={{ marginBottom: '10px' }}>
                  <input
                    type="radio"
                    id={`choice${choiceIndex}`}
                    name={`question${questionIndex}`}
                    value={choice}
                    checked={userAnswers[questionIndex] === choiceIndex}
                    onChange={() => handleClick(questionIndex, choiceIndex)}
                  />
                  <label htmlFor={`choice${choiceIndex}`} style={{ marginLeft: '10px' }}>{choice}</label>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} style={{ marginTop: '10px' }}>Submit</button>
      {correct.length > 0 && (
        <ul style={{ listStyle: 'none', paddingLeft: '0' }}>
          {correct.map((result, index) => (
            <li key={index} style={{ color: result ? 'green' : 'red' }}>
              {result ? 'Correct' : 'Incorrect'}
            </li>
          ))}
        </ul>
      )}
      {score && (
        <div>
          <h2>Your score: {score.toFixed(2)}%</h2>
        </div>
      )}
    </div>
  );
}

export default Quiz;