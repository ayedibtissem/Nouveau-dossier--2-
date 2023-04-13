


const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  choices: {
    type: [String],
    required: true
  },
  correctAnswer: {
    type: String,
    required: true
  }, 
  
  category: {
    type: String,
    required: true
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  questions: {
    type: [questionSchema],
    required: true
  },

});

module.exports = mongoose.model('Quiz', quizSchema);

