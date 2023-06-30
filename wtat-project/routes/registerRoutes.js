const express = require('express');
const router = express.Router();

// Import the necessary controllers
const registerController = require('../controllers/registerController');

// Register page
router.get('/register', registerController.getRegisterPage);
router.post('/register', registerController.postRegisterPage);

module.exports = router;