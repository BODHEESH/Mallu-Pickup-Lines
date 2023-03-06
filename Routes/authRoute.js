const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authController');
const { verifyJwt } = require("../middlewares/verifyJWT")

// GET route to get user profile
router.get('/profile', verifyJwt, authController.getProfile);

// POST route to log in a user
router.post('/login', authController.login);

// POST route to sign up a user
router.post('/signup', authController.signup);

// POST route to log out a user
// router.post('/logout', authController.logout);

module.exports = router;

