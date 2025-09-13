const express= require("express");
const app= express();

app.use(express.json());

// app.use('/api',);

app.get("/", (req, res)=>{
    res.send.status(200).send({message: "wlcome to insta"})
});

const PORT=4000;
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
    
})