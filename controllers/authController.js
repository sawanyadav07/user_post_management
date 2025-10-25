const bcrypt= require("bcrypt");
const User= require("../models/userModel.js");
const comparePassword= require('../utils/comparePassword.js');
const hashPassword= require('../utils/hash.js');
const { generateToken } = require('../config/jsonwebtoken.js');
const customError = require("../utils/customError.js");

exports.register = async (req, res, next) => {
    try {
        const {name, userName, password }= req.body;

        const userExist= await User.findOne({ userName });
          if(userExist) return next(new customError("User already exists", 401))

        const hashedPassword=await hashPassword(password);
        const userPlayload= {
            name: name,
            userName,
            password: hashedPassword
        };

        const newUser= await User.create(userPlayload);
        if (newUser) return  next(new customError("user register successfully", 200))           
       else return next(new customError("Failed to register users", 401))
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return next(new customError("Internal server error", 401))
        
    }
}

exports.login =async (req, res, next) => {
    try {
        const {userName, password }= req.body;
        if(!userName || !password) return res.status(400).json({message: "Username and password are required."})
       const user= await User.findOne({ userName });

      if(!user) return res.status(400).json({ message: "User Not Found"});

      const isMatch= await comparePassword(password, user.password); 

      if(!isMatch) return res.status(401).json({ message: "Invalid Credenntials"});
      
         const token = generateToken(user);

         res.status(200).send({ message:"user login successfully",token: token });
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error: error.message });
    }

}
