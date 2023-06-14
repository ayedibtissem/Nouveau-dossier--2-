import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';

const Dashboard = () => {
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user_data');
    if (userData) {
      const { email } = JSON.parse(userData);
      setAdminEmail(email);
    }
  }, []);

  const [showUsers, setShowUsers] = useState(false);
  const [showQuizzes, setShowQuizzes] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  const toggleQuizzes = () => {
    setShowQuizzes(!showQuizzes);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const redirectToUsersPage = () => {
    window.location.href = 'http://localhost:3000/users';
  };

  return (
    <div>
      <nav style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
        <ul style={{ listStyleType: 'none', display: 'flex', justifyContent: 'space-between', margin: '0', padding: '0' }}>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Home</a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Users</a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Quizzes</a>
          </li>
          <li>
            <a href="#" style={{ color: 'white', textDecoration: 'none', padding: '10px' }}>Categories</a>
          </li>
          <li style={{ display: 'flex', alignItems: 'center' }}>
            {adminEmail && (
              <div>
                <FaUser style={{ marginRight: '5px' }} />
                <span style={{ color: 'white' }}>Contact admin: {adminEmail}</span>
              </div>
            )}
          </li>
        </ul>
      </nav>

      <h1 style={{ marginTop: '20px', color: 'purple' }}>Admin Dashboard</h1>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <section>
          <h2 style={{ marginTop: '10px', color: 'blue' }}>Manage Users</h2>
          <button style={{ marginBottom: '10px', backgroundColor: 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={toggleUsers}>
            {showUsers ? 'Hide Users' : 'Show Users'}
          </button>
          {showUsers && (
            <div>
              <button onClick={redirectToUsersPage} style={{ backgroundColor: 'orange', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>User Management Content</button>
            </div>
          )}
        </section>

        <section>
          <h2 style={{ marginTop: '10px', color: 'blue' }}>Manage Quizzes</h2>
          <button style={{ marginBottom: '10px', backgroundColor: 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={toggleQuizzes}>
            {showQuizzes ? 'Hide Quizzes' : 'Show Quizzes'}
          </button>
          {showQuizzes && (
            <div>
              <p>Quiz Management Content</p>
            </div>
          )}
        </section>

        <section>
          <h2 style={{ marginTop: '10px', color: 'blue' }}>Manage Categories</h2>
          <button style={{ marginBottom: '10px', backgroundColor: 'green', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} onClick={toggleCategories}>
            {showCategories ? 'Hide Categories' : 'Show Categories'}
          </button>
          {showCategories && (
            <div>
              <p>Category Management Content</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;






