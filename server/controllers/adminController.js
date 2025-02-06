const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

const addProductToMenu = async (req, res) => {
  const { name, description, price, imageUrl, adjective } = req.body;
  try {
    const newProduct = new Product({ name, description, price, imageUrl, adjective });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

const updateProductInMenu = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Product updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

const deleteProductFromMenu = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

module.exports = {
  getOrders,
  getUsers,
  addProductToMenu,
  updateProductInMenu,
  deleteProductFromMenu,
};
