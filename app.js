const express= require("express");
const dotenv= require("dotenv");

const allRoute= require('./routes/allRoute.js');
const {connectDB}= require('./config/db.js');

const app= express();
dotenv.config();

const PORT=process.env.PORT;

app.use(express.json());

app.use('/api',allRoute);

connectDB();

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})