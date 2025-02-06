require('dotenv').config(); 
const jwt = require('jsonwebtoken');

const adminAuthMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; 

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY); // Секретный ключ для проверки токена

    
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }

    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminAuthMiddleware;
