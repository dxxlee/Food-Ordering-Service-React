const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
  getCart,
  addProductToCart,
  clearCart,
  decreaseProductQuantity,
  removeItemFromCart,
  clearAllItemsFromCart
} = require('../controllers/cartController');

const router = express.Router();

router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addProductToCart);
router.delete("/", authMiddleware, clearCart);
router.post("/decrease", authMiddleware, decreaseProductQuantity);
router.delete("/remove-item/:productId", authMiddleware, removeItemFromCart);
router.delete("/clear", authMiddleware, clearAllItemsFromCart);

module.exports = router;
