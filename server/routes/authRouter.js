const express = require("express");
const { registerUser, loginUser } = require('../controllers/authController');
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");
const { toggle2FA } = require("../controllers/authController");



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/enable-2fa", authMiddleware, authController.enableTwoFactorAuth);

router.post("/verify-2fa", authMiddleware, authController.verifyTwoFactorAuth);

router.post("/toggle-2fa", authMiddleware, toggle2FA);


module.exports = router;









