const jwt = require("jsonwebtoken");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// HOME
exports.getHome = (req, res) => {
  res.render("home", { title: "Instagram Project" });
};

// REGISTER PAGE
exports.getRegister = (req, res) => {
  res.render("register", { title: "Register", message: null });
};

// LOGIN PAGE
exports.getLogin = (req, res) => {
  res.render("login", { title: "Login", message: null });
};

// REGISTER FORM SUBMIT
exports.postRegister = async (req, res) => {
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
};

// LOGIN FORM SUBMIT
exports.postLogin = async (req, res) => {
  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/user/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    if (data.token) {
      res.cookie("token", data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.redirect("/dashboard");
    }

    res.render("login", { title: "Login", message: data.message });
  } catch (error) {
    res.render("login", { title: "Login", message: "Error logging in" });
  }
};

// DASHBOARD (Protected)
exports.getDashboard = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.redirect("/login");

  try {
    const decoded = jwt.decode(token);
    const username = decoded?.userName || "Guest";

    const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const posts = await response.json();

    res.render("dashboard", {
      title: "Dashboard",
      username,
      posts: Array.isArray(posts) ? posts : [],
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.render("dashboard", {
      title: "Dashboard",
      username: "Guest",
      posts: [],
      message: "Error fetching posts",
    });
  }
};

// LOGOUT
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
