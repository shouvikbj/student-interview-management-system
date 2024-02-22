const mongoose = require('mongoose');

// Define the Result schema
const resultSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  result: {
    type: String,
    enum: ['PASS', 'FAIL', 'On Hold', 'Didn’t Attempt'],
    required: true
  }
});

// Create the Result model
const Result = mongoose.model('Result', resultSchema);

module.exports = Result;
