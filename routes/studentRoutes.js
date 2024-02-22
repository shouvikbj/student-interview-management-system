const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route to show the form for creating a new student
router.get('/add', (req, res) => {
    res.render('students/add.ejs');
});

// Route for creating a new student
router.post('/', studentController.createStudent);

// Route for retrieving all students
router.get('/', async (req, res) => {
    const students = await studentController.getAllStudents();
    res.render("students/index.ejs", {students: students});
});

module.exports = router;
