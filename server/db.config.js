require('dotenv').config(); 

// const dbHost = process.env.DB_HOST || 'localhost';  
// const dbPort = process.env.DB_PORT || 27017;        
// const dbName = process.env.DB_NAME || 'food-ordering';  

const uri = process.env.MONGODB_URI;
module.exports = {
    url: uri
};
