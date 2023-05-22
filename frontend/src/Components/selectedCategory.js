import React from 'react';

function SelectedQuiz({ category, difficulty }) {
  return (
    <div>
      <h1>Selected Quiz</h1>
      <h2>Category: {category}</h2>
      <h2>Difficulty: {difficulty}</h2>
      {}
    </div>
  );
}

export default SelectedQuiz;
