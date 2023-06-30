const express = require('express');
const router = express.Router();

// Import the necessary controllers
const logoutController = require('../controllers/logoutController');

// Logout page
router.get('/logout', logoutController.getLogoutPage);

module.exports = router;