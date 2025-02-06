const express = require('express');
const { createUser, uploadAvatar } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure that the user is authenticated
const multer = require('multer');

const router = express.Router();

router.post('/create-user', createUser);

router.post('/upload-avatar', authMiddleware, multer().single('avatar'), uploadAvatar);

module.exports = router;
