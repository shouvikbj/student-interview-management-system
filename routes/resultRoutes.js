const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');

// Route for creating a new result
router.post('/', resultController.createResult);

// Route for retrieving all results
router.get('/', resultController.getAllResults);

module.exports = router;
