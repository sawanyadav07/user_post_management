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
app.use(express.urlencoded({ extended: true })); // for form submission
app.use(express.static(path.join(__dirname, "public")));

// ===== View Engine Setup =====
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layouts/main");

// ===== Database =====
connectDB();

// ===== API Routes =====
app.use("/api", allRoute);

// ===== EJS Routes =====
app.get("/", (req, res) => {
  res.render("home", { title: "Instagram Project" });
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register", message: null });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login", message: null });
});

// ===== POST: Register (Form Submission) =====
app.post("/register", async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/user/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.render("register", { title: "Register", message: data.message });
  } catch (error) {
    res.render("register", { title: "Register", message: "Error registering user" });
  }
});

// ===== POST: Login (Form Submission) =====
app.post("/login", async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.render("login", { title: "Login", message: data.message });
  } catch (error) {
    res.render("login", { title: "Login", message: "Error logging in" });
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
