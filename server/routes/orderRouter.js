const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  createOrder,
  getUserOrders
} = require('../controllers/orderController');

const router = express.Router();

router.post("/create", authMiddleware, createOrder);
router.get("/", authMiddleware, getUserOrders);

module.exports = router;
