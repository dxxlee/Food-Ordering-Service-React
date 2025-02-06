const express = require("express");
const {
  getAllProducts,
  getProductsByCategories
} = require('../controllers/productController');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products-by-categories', getProductsByCategories);

module.exports = router;
