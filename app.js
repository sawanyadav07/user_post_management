const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require('cookie-parser');
const allRoute = require("./routes/allRoute.js");
const errorHandler = require("./middlewares/errorHandler.js")
const { connectDB } = require("./config/db.js");
const morgan = require('morgan');

dotenv.config();
const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(errorHandler); 
app.use(morgan('dev'));

connectDB();

app.use("/api", allRoute);     

// ===== Start Server =====
const PORT = process.env.PORT || 5600;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
