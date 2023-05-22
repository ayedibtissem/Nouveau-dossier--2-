
const mongoose = require('mongoose');

const robotSchema = new mongoose.Schema({
  name: String,
});

const Robot = mongoose.model('Robot', robotSchema);

module.exports = Robot;

