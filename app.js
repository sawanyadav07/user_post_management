const express= require("express");
const dotenv= require("dotenv");

const app= express();
dotenv.config();

const PORT=process.env.PORT;

const authRoute= require('./routes/authRoute')
const {connectDB}= require('./config/db.js');

app.use(express.json());

app.use('/api',authRoute);

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})