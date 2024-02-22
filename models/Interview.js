const mongoose = require('mongoose');

// Define the Interview schema
const interviewSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

// Create the Interview model
const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
