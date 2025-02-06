const express = require('express');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');
const {
  getOrders,
  getUsers,
  addProductToMenu,
  updateProductInMenu,
  deleteProductFromMenu
} = require('../controllers/adminController');

const router = express.Router();

router.get('/orders', adminAuthMiddleware, getOrders);
router.get('/users', adminAuthMiddleware, getUsers);
router.post('/menu', adminAuthMiddleware, addProductToMenu);
router.put('/menu/:id', adminAuthMiddleware, updateProductInMenu);
router.delete('/menu/:id', adminAuthMiddleware, deleteProductFromMenu);

module.exports = router;
