const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');




router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.put('/:id', quizController.updateQuizById);
router.delete('/:id', quizController.deleteQuizById);
module.exports = router;
