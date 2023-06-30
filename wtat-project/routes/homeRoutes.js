const express = require('express');
const router = express.Router();

// Import the necessary controllers
const homeController = require('../controllers/homeController');

// Homepage
router.get('/', homeController.getHomepage);

module.exports = router;