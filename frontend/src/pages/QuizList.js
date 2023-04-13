import React, { useState, useEffect } from "react";
import axios from "axios";
import Quiz from "./Quiz";
import cat from "../cat.png"


function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    async function fetchQuizzes() {
      const { data } = await axios.get("http://localhost:3005/quizzes");
      setQuizzes(data);
    }

    fetchQuizzes();
  }, []);

  return (
    
    
        <div >
     {quizzes.map((quiz) => (
        <Quiz key={quiz._id} quiz={quiz} />


        
      ))}
      </div>

     
  
    
  );
}

export default QuizList;

