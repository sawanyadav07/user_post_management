// const express= require("express");
// const dotenv= require("dotenv");
// const path= require('path');
// const expressLayouts = require("express-ejs-layouts");
// const allRoute= require('./routes/allRoute.js');
// const {connectDB}= require('./config/db.js');

// const app= express();
// dotenv.config();

// const PORT=process.env.PORT;

// app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));


// // Set EJS as view engine
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(expressLayouts); // ✅ Enable layouts
// app.set("layout", "layouts/main"); // Default layout file

// app.use('/api',allRoute);


// connectDB();

// // ====== EJS UI ROUTES ======
// app.get("/", (req, res) => {
//   res.render("home"); // 👈 this matches your home.ejs
// });
// app.listen(PORT, ()=>{
//     console.log(`Server running on port ${PORT}`);
    
// })


const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const allRoute = require("./routes/allRoute.js");
const { connectDB } = require("./config/db.js");

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ===== View Engine Setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// ===== Database =====
connectDB();

// ===== Routes =====
app.get("/", (req, res) => {
  res.render("home", { title: "Instagram Project" });
});

app.use("/api", allRoute);

// ===== Start Server =====
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
