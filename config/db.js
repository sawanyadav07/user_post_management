const mongoose = require('mongoose');
const dotenv= require('dotenv');

dotenv.config();
const PORT= process.env.MONGO_URL || 3000;

const connectDB= ()=> {
    try {
        mongoose.connect(PORT,{
            
        });
        console.log("mongoDB connected");
        
    } catch (error) {
        console.error("Database connection error: ", error);
        process.exit(1);
    }
}

module.exports= {connectDB };