require('dotenv').config(); 

const dbHost = process.env.DB_HOST || 'localhost';  
const dbPort = process.env.DB_PORT || 27017;        
const dbName = process.env.DB_NAME || 'food-ordering';  

module.exports = {
    url: `mongodb://${dbHost}:${dbPort}/${dbName}` 
};
