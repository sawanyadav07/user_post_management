

// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.stack || err.message);

  // Determine HTTP status
  const statusCode = err.statusCode || 500;

  // If API request
  if (req.originalUrl.startsWith("/api")) {
    return res.status(statusCode).json({
      success: false,
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }

  // If EJS page request (render error page)
  res.status(statusCode).render("error", {
    title: "Error",
    message: err.message || "Something went wrong",
    statusCode,
  });
};

module.exports = errorHandler;
