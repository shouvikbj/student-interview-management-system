const mongoose = require('mongoose');

// Define the Student schema
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['placed', 'not_placed'],
    required: true
  },
  DSAFinalScore: {
    type: Number,
    required: true
  },
  WebDFinalScore: {
    type: Number,
    required: true
  },
  ReactFinalScore: {
    type: Number,
    required: true
  }
});

// Create the Student model
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
