const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to render the login page
router.get('/login', (req, res) => {
  res.render('auth/login');
});

// Route to render the signup page
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// Route for user registration
router.post('/signup', authController.signup);

// Route for user login
router.post('/login', authController.login);

// Route for user logout
router.get('/logout', authController.logout);

module.exports = router;
