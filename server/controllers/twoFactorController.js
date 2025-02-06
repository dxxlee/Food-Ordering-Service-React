// // controllers/twoFactorController.js
// const speakeasy = require('speakeasy');
// const qrcode = require('qrcode');
// const User = require('../models/userModel');

// // Enable 2FA
// const enable2FA = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (user.is2FAEnabled) {
//       return res.status(400).json({ message: "2FA is already enabled" });
//     }

//     const secret = speakeasy.generateSecret({ name: `MyApp (${user.email})` });

//     // Save the secret to the user record
//     user.twoFactorSecret = secret.base32;
//     user.is2FAEnabled = true;
//     await user.save();

//     // Generate a QR code URL for Google Authenticator
//     const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

//     res.json({ qrCodeUrl, secret: secret.base32 });
//   } catch (err) {
//     res.status(500).json({ message: "Error enabling 2FA", error: err.message });
//   }
// };

// // Disable 2FA
// const disable2FA = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user.is2FAEnabled) {
//       return res.status(400).json({ message: "2FA is not enabled" });
//     }

//     user.is2FAEnabled = false;
//     user.twoFactorSecret = null; // Remove the 2FA secret
//     await user.save();

//     res.json({ message: "2FA disabled successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Error disabling 2FA", error: err.message });
//   }
// };

// // Verify OTP (for login)
// const verify2FA = async (req, res) => {
//     try {
//       const { otp } = req.body;
//       const user = await User.findById(req.user.id);
  
//       if (!user.is2FAEnabled) {
//         console.log("2FA is not enabled");
//         return res.status(400).json({ message: "2FA is not enabled" });
//       }
  
//       const verified = speakeasy.totp.verify({
//         secret: user.twoFactorSecret,
//         encoding: 'base32',
//         token: otp,
//       });
  
//       if (!verified) {
//         console.log("Invalid OTP");
//         return res.status(400).json({ message: "Invalid OTP" });
//       }
  
//       console.log("OTP verified successfully");
//       res.json({ message: "OTP verified successfully" });
//     } catch (err) {
//       console.error("Error verifying OTP:", err);
//       res.status(500).json({ message: "Error verifying OTP", error: err.message });
//     }
//   };
  

// module.exports = { enable2FA, disable2FA, verify2FA };
