const Joi = require("joi");

// ✅ Register Validation Schema
const registerValidation = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
  }),
  userName: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.alphanum": "Username must contain only letters and numbers",
  }),
  password: Joi.string()
    .min(6)
    .max(30)
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 6 characters long",
    }),
});

// ✅ Login Validation Schema
const loginValidation = Joi.object({
  userName: Joi.string().required().messages({
    "string.empty": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

module.exports = { registerValidation, loginValidation };
