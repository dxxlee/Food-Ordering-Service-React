// adminAuthController.js
require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const SECRET_KEY = process.env.SECRET_KEY;

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Attempting admin login for:", email);
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied: Not an admin" });
    }
    // Можно добавить 2FA для администратора, если требуется
    const token = jwt.sign({ id: user._id, role: "admin" }, SECRET_KEY, { expiresIn: "1h" });
    console.log("Admin login successful. JWT:", token);
    res.json({ token, user });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { loginAdmin };
