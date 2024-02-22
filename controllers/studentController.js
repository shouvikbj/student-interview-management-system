const Student = require('../models/Student');

// Controller object to export
const studentController = {};

// Create a new student
studentController.createStudent = async (req, res) => {
  try {
    const { name, college, status, DSAFinalScore, WebDFinalScore, ReactFinalScore } = req.body;
    const newStudent = new Student({ name, college, status, DSAFinalScore, WebDFinalScore, ReactFinalScore });
    await newStudent.save();
    res.redirect("/students");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all students
studentController.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    return students;
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = studentController;
