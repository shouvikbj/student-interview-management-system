const Interview = require('../models/Interview');

// Controller object to export
const interviewController = {};

// Create a new interview
interviewController.createInterview = async (req, res) => {
  try {
    const { companyName, date } = req.body;
    const newInterview = new Interview({ companyName, date });
    await newInterview.save();
    res.redirect("/interviews");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all interviews
interviewController.getAllInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    return interviews;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = interviewController;
