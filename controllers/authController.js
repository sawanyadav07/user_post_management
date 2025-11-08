const bcrypt = require("bcrypt");
const User = require("../models/userModel.js");
const comparePassword = require('../utils/comparePassword.js');
const hashPassword = require('../utils/hash.js');
const { generateToken } = require('../config/jsonwebtoken.js');
const { registerValidation, loginValidation } = require("../validators/userValidation.js");


exports.register = async (req, res, next) => {
  try {
    // ✅ Validate input using Joi
    const { error } = registerValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, userName, password } = req.body;

    if (!name || !userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ userName });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await hashPassword(password);

    const userPayload = {
      name,
      userName,
      password: hashedPassword,
    };

    const newUser = await User.create(userPayload);

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        userName: newUser.userName,
      },
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
      // ✅ Validate input using Joi
    const { error } = loginValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { userName, password } = req.body;
    if (!userName || !password) return res.status(400).json({ message: "Username and password are required." })
    const user = await User.findOne({ userName });

    if (!user) return res.status(400).json({ message: "User Not Found" });

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) return res.status(401).json({ message: "Invalid Credenntials" });

    const token = generateToken(user);

    res.status(200).send({ message: "user login successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error.message });
  }

}
