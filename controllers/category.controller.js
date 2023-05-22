const Quiz = require('../models/quiz.model');
exports.createCategory = async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json({ message: 'Quiz category created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getQuizzesByCategory = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ category: req.params.category });
    res.json(quizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};