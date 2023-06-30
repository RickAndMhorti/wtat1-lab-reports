const express = require('express');
const router = express.Router();

// Import the necessary controllers
const matchController = require('../controllers/matchController');

// Match page
router.get('/matchmaking', matchController.getMatchPage);

module.exports = router;