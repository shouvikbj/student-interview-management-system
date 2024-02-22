const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');

// Route to show the form for creating a new interview
router.get('/add', (req, res) => {
    res.render('interviews/add.ejs');
});

// Route for creating a new interview
router.post('/', interviewController.createInterview);

// Route for retrieving all interviews
router.get('/', async (req, res) => {
    // Retrieve the interviews data from the controller
    const interviews = await interviewController.getAllInterviews();
    res.render("interviews/index.ejs", {interviews: interviews})
});

module.exports = router;
