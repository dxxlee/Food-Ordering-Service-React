const User = require('../models/userModel');
const multer = require('multer');
const path = require('path');

const createUser = async (req, res) => {
  try {
    const { name, email, _id } = req.body;
    
    const user = new User({
      name,
      email,
      _id
    });

    await user.save();
    res.status(200).json({ data: user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/avatars')); 
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

const uploadAvatar = upload.single('avatar');  

const handleAvatarUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const user = await User.findById(req.user.id); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    user.avatar = `/uploads/avatars/${req.file.filename}`; 
    await user.save();

    res.json({ avatar: user.avatar });
  } catch (err) {
    console.error("Error uploading avatar:", err);
    res.status(500).json({ message: "Error uploading avatar", error: err.message });
  }
};

module.exports = {
  createUser,
  uploadAvatar: handleAvatarUpload,
};
