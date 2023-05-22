import React from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Photo from './Components/Photo';
import QuizList from './pages/QuizList';
import Navbar from './pages/Navbar';
import Challenge from './Components/Challenge';
import Robot from './Components/robot';
import SelectedQuiz from './Components/selectedCategory';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Photo>
          <Navbar></Navbar>
         
        </Photo>
      ),
    },
    {
      path: '/login',
      element: <Login></Login>,
    },
    {
      path: '/register',
      element: <Register></Register>,
    },
    {
      path: '/quizzes',
      element: <QuizList></QuizList>,
    },
    {
      path: '/challenge',
      element: <Challenge></Challenge>,
    },
    {
      path: '/robot',
      element: <Robot></Robot>,
    },
    {
      path: '/quiz',
      element: <SelectedQuiz></SelectedQuiz>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;

