const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)); // ✅ for Node.js < v18

// Render Home
exports.getHome = (req, res) => {
    res.render("home", { title: "Instagram Project" });
};

// Render Register Page
exports.getRegister = (req, res) => {
    res.render("register", { title: "Register", message: null });
};

// Render Login Page
exports.getLogin = (req, res) => {
    res.render("login", { title: "Login", message: null });
};

// Handle Register Form
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

// Handle Login Form
exports.postLogin = async (req, res) => {
    try {
        const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/user/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        console.log("data==>", data);
        
        if (data.token) {
            // ✅ Save token in cookies
            res.cookie("token", data.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
             // Redirect to dashboard
             return res.redirect("/dashboard");
        }
     
        res.render("login", { title: "Login", message: data.message });
    } catch (error) {
        res.render("login", { title: "Login", message: "Error logging in" });
    }
};

// Protected Dashboard
exports.getDashboard = async (req, res) => {
  const token = req.cookies.token; // ✅ Read token

  if (!token) {
    return res.redirect("/login");
  }

  try {
    const response = await fetch(`http://localhost:${process.env.PORT || 5600}/api/posts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    const posts = await response.json();

    res.render("dashboard", { title: "Dashboard", posts });
  } catch (error) {
    res.render("dashboard", { title: "Dashboard", posts: [], message: "Error fetching posts" });
  }
};

// Logout user
exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.redirect("/login");
};
