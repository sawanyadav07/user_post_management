const express= require("express");
const app= express();

const authRoute= require('./routes/authRoute')

app.use(express.json());

app.use('/api',authRoute);

const PORT=4000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})