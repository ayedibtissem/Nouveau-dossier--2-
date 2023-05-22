
const Robot = require('../models/robotmodel');
exports.generateNumberAndCheckAnswer = (req, res) => {
  const { level } = req.body;
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let answer = false;
  if (level === 'easy' && randomNumber <= 30) {
    answer = true;
  } else if (level === 'medium' && randomNumber <= 50) {
    answer = true;
  } else if (level === 'difficult' && randomNumber <= 70) {
    answer = true;
  }
  res.json({ answer });
};
