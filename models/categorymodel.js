const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: ['phishing', 'email protection', 'password policies'], 
  },
  questions: [
    {
      question: {
        type: String,
        required: true,
      },
      options: [String],
      answer: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
