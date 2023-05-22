
  import React, { useState } from 'react';
  import Radio from '@mui/material/Radio';
  import RadioGroup from '@mui/material/RadioGroup';
  import FormControlLabel from '@mui/material/FormControlLabel';
  import FormControl from '@mui/material/FormControl';
  import FormLabel from '@mui/material/FormLabel';
  import Button from '@mui/material/Button';
  import { useNavigate } from 'react-router-dom';
  import Categories from './Categories';
  
  function Challenge() {
    const navigate = useNavigate();
    const [opponent, setOpponent] = useState('human');
    const [showCategories, setShowCategories] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedLevel, setSelectedLevel] = useState('');
  
    function handleCategoryChange(category) {
      setSelectedCategory(category);
    }
  
    function handleLevelChange(level) {
      setSelectedLevel(level);
    }
  
    function handleClick() {
      if (selectedCategory && selectedLevel) {
        navigate(`/quiz?category=${selectedCategory}&level=${selectedLevel}`);
      } else {
        console.log('Please select both category and level');
      }
    }
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', color: '#FFB89A' }}>Challenge</h1>
      <h2 style={{ textAlign: 'center', color: '#2196f3', marginBottom: '2rem' }}>
        Select the player you wish to play with?
      </h2>
      <FormControl component="fieldset" style={{ marginBottom: '2rem' }}>
        <FormLabel component="legend" style={{ marginBottom: '1rem', color: '#2196f3', fontWeight: 'bold' }}>
          Choose your opponent:
        </FormLabel>
          <RadioGroup
            aria-label="opponent"
            value={opponent}
            onChange={(event) => setOpponent(event.target.value)}
            name="radio-buttons-group"
            style={{ flexDirection: 'row' }}
          >
            <FormControlLabel
              value="robot"
              control={<Radio />}
              label={
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1547/1547183.png"
                    alt="Robot"
                    style={{ height: '70px', marginRight: '5px' }}
                  />
                  Robot
                </div>
              }
            />
          </RadioGroup>
        </FormControl>
        {opponent === 'human' ? (
          <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
            You have selected to play with a human.
          </p>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
            <p style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>
              You have selected to play with a robot.
            </p>
  
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1547/1547183.png"
                  alt="Human vs Robot"
                  style={{ height: '120px', marginRight: '1rem', borderRadius: '4px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '5px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px',
                    borderRadius: '4px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Robot
                </div>
              </div>
              <p style
  
  ={{ fontWeight: 'bold', fontSize: '2rem', margin: '0 1rem' }}>vs</p>
              <div style={{ position: 'relative' }}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8N1LOjpnZwEHmZAURdB-pIp55H__ezU0_dLmhnZx5hgiOnONKUyV86t5AtCpChWce-xo&usqp=CAU" 
                  alt="Human vs Robot"
                  style={{ height: '120px', marginLeft: '1rem', borderRadius: '4px' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    bottom: '5px',
                    left: '5px',
                    background: 'rgba(0, 0, 0, 0.5)',
                    padding: '5px',
                    borderRadius: '4px',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Human
                </div>
              </div>
            </div>
          </div>
        )}
        {opponent && (
          <>
            <h1 style={{ marginTop: '3rem', color: 'blue', fontWeight: 'bold' }}>SELECT Category</h1>
            <Button
              variant="outlined"
              sx={{
                backgroundColor: '#4caf50',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#45a049',
                },
                marginTop: '1rem',
                marginBottom: '2rem',
              }}
              onClick={() => setShowCategories(!showCategories)}
            >
              {showCategories ? 'Hide' : 'Show'} Categories
            </Button>
            {showCategories && (
              <Categories
                onCategoryChange={handleCategoryChange}
                onLevelChange={handleLevelChange}
              />
            )}
          </>
        )}
        {opponent && (
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: '2rem',
              backgroundColor: '#f44336',
              '&:hover': {
                backgroundColor: '#d32f2f',
              },
            }}
            onClick={handleClick}
          >
            Start Quiz
          </Button>
        )}
      </div>
    );
  }
  
  export default Challenge;
