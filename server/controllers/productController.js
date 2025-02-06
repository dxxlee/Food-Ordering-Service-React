const Product = require("../models/productModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getProductsByCategories = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: {} },
      {
        $group: {
          _id: "$category",
          products: { $push: "$$ROOT" }
        }
      },
      { $project: { name: "$_id", products: 1, _id: 0 } }
    ]);
    res.status(200).json({ data: products });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllProducts,
  getProductsByCategories
};
