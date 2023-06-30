const express = require('express');
const router = express.Router();

// Import the necessary controllers
const userController = require('../controllers/userController');

// Display all users
router.get('/users', userController.displayAllUsers);

// Update a user
router.post('/users/update/:id', userController.updateUser);

// Delete a user
router.post('/users/delete/:id', userController.deleteUser);

// Get a user by ID
router.get('/users/:id', userController.getUserById);

// Fetch modal content
router.get('/fetch-modal-content', userController.fetchModalContent);

module.exports = router;