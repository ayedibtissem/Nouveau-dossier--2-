import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Photo from './Components/Photo';
import QuizList from './pages/QuizList';
import Navbar from './pages/Navbar';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Photo>
          <Navbar></Navbar>
        </Photo>
      ),
    },
    {
      path: "/login",
      element: <Login></Login>,
    },
    {
      path: "/register",
      element: <Register></Register>,
    },
    {
      path: "/quizzes",
      element: <QuizList></QuizList>,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
