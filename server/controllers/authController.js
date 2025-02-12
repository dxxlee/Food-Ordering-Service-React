require('dotenv').config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registering user:", { name, email });
    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    console.log("User registered successfully:", user);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Если 2FA включён — возвращаем временный токен для прохождения проверки 2FA
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body; // код 2FA не передаётся на этом этаее
    console.log("\n\n==============================================================================================");
    console.log("Attempting login for:", email);
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid email or password for:", email);
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.twoFactorEnabled) {
      // Генерируем временный токен с коротким сроком
      const tempToken = jwt.sign({ id: user._id, twoFactor: false }, SECRET_KEY, { expiresIn: "5m" });
      console.log("\nUser has 2FA ENABLED.\nReturning temporary token:", tempToken);
      return res.status(206).json({ 
        message: "2FA token required", 
        tempToken, 
        user: { id: user._id } 
      });
    }

    // Если пользователь админ, добавляем role: "admin", иначе role: "user"
    const role = user.isAdmin ? "admin" : "user";
    
    // Если 2FA не включён, возвращаем финальный JWT
    const jwtToken = jwt.sign({ id: user._id, twoFactor: true, role }, SECRET_KEY, { expiresIn: "1h" });
    console.log("Login successful. JWT:", jwtToken);
    // Включаем isAdmin в объект пользователя
    return res.json({ 
      token: jwtToken, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        isAdmin: user.isAdmin  // добавлено поле isAdmin
      } 
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Генерация секрета и QR-кода для настройки 2FA
const enableTwoFactorAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found for 2FA setup:", req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    const secret = speakeasy.generateSecret({ name: `FoodOrderingService(${user.email})` });
    console.log("Generated 2FA secret for", user.email, ":", secret.base32);

    // Сохраняем секрет, но не активируем 2FA до проверки кода
    user.twoFactorSecret = secret.base32;
    await user.save();

    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);
    console.log("Generated QR code URL:", qrCodeUrl);

    res.json({ message: '2FA setup initiated', qrCodeUrl, secret: secret.base32 });
  } catch (err) {
    console.error('Error enabling 2FA:', err);
    res.status(500).json({ message: 'Error enabling 2FA', error: err.message });
  }
};

// Проверка 2FA кода (Второй шаг)
const verifyTwoFactorAuth = async (req, res) => {
  try {
    const { token: twoFAToken } = req.body; // 6-значный код из Google Authenticator
    console.log("\nVerifying 2FA token:", twoFAToken);

    // req.user.id получен из временного токена (tempToken)
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found during 2FA verification:", req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.twoFactorEnabled) {
      console.log("2FA not enabled for user:", user.email);
      return res.status(400).json({ message: "2FA not enabled" });
    }

    // проверяем введённый код с небольшим допуском по времени 
    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret,
      encoding: 'base32',
      token: twoFAToken,
      window: 1,
    });

    console.log("\n2FA verification result for user", user.email, ":", verified);
    if (verified) {
      const role = user.isAdmin ? "admin" : "user";
      const jwtToken = jwt.sign({ id: user._id, twoFactor: true, role }, SECRET_KEY, { expiresIn: "1h" });
      console.log("\n2FA verified. Final JWT generated:", jwtToken);
      console.log("==============================================================================================");
      res.json({ 
        message: '2FA verified successfully', 
        token: jwtToken, 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email,
          isAdmin: user.isAdmin  // включено поле isAdmin
        } 
      });
    } else {
      console.log("Invalid 2FA token provided for user:", user.email);
      res.status(400).json({ message: 'Invalid 2FA token' });
    }
  } catch (err) {
    console.error('Error verifying 2FA:', err);
    res.status(500).json({ message: 'Error verifying 2FA', error: err.message });
  }
};

// Переключение состояния 2FA (включение/выключение)
const toggle2FA = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      console.log("User not found during 2FA toggle:", req.user.id);
      return res.status(404).json({ message: "User not found" });
    }

    if (user.twoFactorEnabled) {
      user.twoFactorEnabled = false;
      user.twoFactorSecret = null;
      await user.save();
      console.log("2FA disabled for user:", user.email);
      return res.json({ twoFactorEnabled: false });
    } else {
      const secret = speakeasy.generateSecret({ name: user.email });
      user.twoFactorEnabled = true;
      user.twoFactorSecret = secret.base32;
      await user.save();
      console.log("2FA enabled for user:", user.email, "New secret:", secret.base32);
      return res.json({
        twoFactorEnabled: true,
        secret: secret.base32, 
      });
    }
  } catch (err) {
    console.error("Error toggling 2FA:", err);
    res.status(500).json({ message: "Error toggling 2FA", error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  enableTwoFactorAuth,
  verifyTwoFactorAuth,
  toggle2FA
};
