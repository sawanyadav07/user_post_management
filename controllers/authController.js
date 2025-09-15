const bcrypt= require("bcrypt");
const User= require("../models/userModel");

const register = async (req, res, next) => {
    try {
        const {name, email, password }= req.body;

        const userExist= await User.findOne({ email });
        if(userExist) return res.status(400).json({message: "User already exists"});

        const salt= await bcrypt.genSalt(10)
        const hashedPassword=  await bcrypt.hash(password, salt);
        const userPlayload= {
            name,
            email,
            password: hashedPassword
        };

        const newUser= await User.create(userPlayload);
        if (newUser) return res.status(200).json({message: "user register successfully"});           
       else res.status(400).json({message: "Failed to register user"});
    } catch (error) {
       console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const login =async (req, res, next) => {
    try {
        const {email, password }= req.body;
        if(!email || !password) return res.status(400).json({message: "Email and password are required."})
       const use̥r= await User.findOne({ email });
      if(use̥r) res.status(200).send("user login successfully");

      
    } catch (error) {
           res.status(500).json({ message: "Internal server error", error: error.message });
    }

}

module.exports = { register, login };