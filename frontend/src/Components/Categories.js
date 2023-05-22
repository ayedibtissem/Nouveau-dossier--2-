import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import Pho from './Photo1';

const CategoryContainer = styled('div')(({ selected, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: 180,
  width: 180,
  borderRadius: 8,
  border: `2px solid ${theme.palette.grey[500]}`,
  margin: '0.5rem',
  background: selected ? theme.palette.primary.main : theme.palette.grey[200],
  transition: 'background 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    background: selected ? theme.palette.primary.main : theme.palette.grey[300],
  },

}));


const CategoryImage = styled('img')({
  maxWidth: '70%',
  maxHeight: '70%',
});

const CategoryTitle = styled(Typography)(({ theme }) => ({
  marginTop: '8px',
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.text.primary,
  textTransform: 'uppercase',
}));

const DifficultyContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
});

const DifficultyLabel = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '14px',
  marginBottom: '5px',
  color: theme.palette.secondary.main,
}));

const DifficultyButton = styled(Button)(({ selected, theme }) => ({
  marginLeft: '5px',
  backgroundColor: selected ? '#FF5722' : '#F5F5F5',
  color: selected ? 'white' : 'black',
  transition: 'background 0.3s ease',
  '&:hover': {
    backgroundColor: selected ? '#FF5722' : theme.palette.action.hover,
  },
}));

const SelectedTitle = styled(Typography)(({ theme }) => ({
  margin: '20px',
  fontSize: '24px',
  fontWeight: 'bold',
  color: theme.palette.secondary.main,
  textTransform: 'uppercase',
}));

function Categories({ onCategoryChange, onLevelChange }) {
  const tabs = [
    {
      title: 'phishing',
      label: 'Phishing',
      image: <Pho />,
      link: '/phishing',
    },
    {
      title: 'email',
      label: 'Email',
      image: <Pho />,
      link: '/email',
    },
    {
      title: 'security',
      label: 'Security',
      image: <Pho />,
      link: '/security',
    },
    {
      title: 'ph',
      label: 'PH',
      image: <Pho />,
      link: '/ph',
    },
    {
      title: 'protection',
      label: 'Protection',
      image: <Pho />,
      link: '/protection',
    },
  ];

  const [selectedTitle, setSelectedTitle] = useState('');
  const [categoryDifficulties, setCategoryDifficulties] = useState({});

  const handleTitleSelect = (title) => {
    setSelectedTitle(title);
  };

  const handleDifficultyChange = (category, difficulty) => {
    setCategoryDifficulties((prevState) => ({
      ...prevState,
      [category]: difficulty,
    }));
  };

  const handleCategorySelection = () => {
    onCategoryChange(selectedTitle);
    onLevelChange(categoryDifficulties[selectedTitle]);
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        {tabs.map((tab) => (
          <Grid item key={tab.title}>
            <CategoryContainer
              selected={selectedTitle === tab.title}
              onClick={() => handleTitleSelect(tab.title)}
            >
              <Link to={tab.link}>{tab.image}</Link>
              <CategoryTitle>{tab.label}</CategoryTitle>
            </CategoryContainer>
          </Grid>
        ))}
      </Grid>
      {selectedTitle && (
        <>
          <SelectedTitle>{selectedTitle}</SelectedTitle>
          <DifficultyContainer>
            <DifficultyLabel>Difficulty:</DifficultyLabel>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'easy'}
              onClick={() => handleDifficultyChange(selectedTitle, 'easy')}
            >
              Easy
            </DifficultyButton>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'medium'}
              onClick={() => handleDifficultyChange(selectedTitle, 'medium')}
            >
              Medium
            </DifficultyButton>
            <DifficultyButton
              selected={categoryDifficulties[selectedTitle] === 'hard'}
              onClick={() => handleDifficultyChange(selectedTitle, 'hard')}
            >
              Hard
            </DifficultyButton>
          </DifficultyContainer>
          <Button
            variant="outlined"
            sx={{
              marginTop: '1rem',
              marginBottom: '2rem',
              backgroundColor: '#4caf50',
              color: 'white',
              '&:hover': {
                backgroundColor: '#45a049',
              },
            }}
            onClick={handleCategorySelection}
          >
            Select Category
          </Button>
        </>
      )}
    </>
  );
}

export default Categories;

