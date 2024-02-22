const Result = require('../models/Result');

// Controller object to export
const resultController = {};

// Create a new result
resultController.createResult = async (req, res) => {
  try {
    const { companyId, studentId, result } = req.body;
    const newResult = new Result({ companyId, studentId, result });
    await newResult.save();
    res.status(201).json({ message: 'Result created successfully', result: newResult });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all results
resultController.getAllResults = async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = resultController;
