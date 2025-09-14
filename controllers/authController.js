const User= require("../models/userModel");
const { use } = require("../routes/authRoute");

const register = async (req, res, next) => {
    try {
        const {name, email, password }= req.body;

        const userExist= await User.findOne({ email });
        if(userExist) return res.status(400).json({message: "User already exists"});

        const userPlayload= {
            name,
            email,
            password
        };

        const newUser= await User.create(userPlayload);
        if (newUser) return res.status(200).json({message: "user register successfully"});           

    } catch (error) {
        console.log("Error register user", error);

    }
}

const login = (req, res, next) => {
    try {
        console.log("user login successfully");
        res.status(200).send("user login successfully");
    } catch (error) {
        res.status(400).send("error", error)
    }

}

module.exports = { register, login };