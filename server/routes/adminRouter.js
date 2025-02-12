// adminRouter.js
const express = require('express');
const router = express.Router();
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");
const adminController = require("../controllers/adminController");
const { loginAdmin } = require("../controllers/adminAuthController");

// Админ-логин
router.post('/login', loginAdmin);

// Протектед маршруты (доступны только для администраторов)
router.get('/orders', adminAuthMiddleware, adminController.getOrders);
router.get('/users', adminAuthMiddleware, adminController.getUsers);
router.get('/menu', adminAuthMiddleware, async (req, res) => {
  try {
    const products = await require('../models/productModel').find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
});
router.post('/menu', adminAuthMiddleware, adminController.addProductToMenu);
router.put('/menu/:id', adminAuthMiddleware, adminController.updateProductInMenu);
router.delete('/menu/:id', adminAuthMiddleware, adminController.deleteProductFromMenu);

module.exports = router;
