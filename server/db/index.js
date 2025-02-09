require('dotenv').config(); 

const mongoose = require("mongoose");

//const dbHost = process.env.DB_HOST || 'localhost';
//const dbPort = process.env.DB_PORT || 27017;
//const dbName = process.env.DB_NAME || 'food-ordering';

// const dbUri = `mongodb://${dbHost}:${dbPort}/${dbName}`;
const uri = process.env.MONGODB_URI;

const db = async () => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = db;

