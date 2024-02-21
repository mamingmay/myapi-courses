const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  program: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  units: {
    type: Number,
    required: true
  },
  tags: [String] 
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
