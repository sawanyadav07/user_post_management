const jwt= require('jsonwebtoken');

const generateToken= (user) =>{
    return jwt.sign({id: user._id, userName: user.userName}, process.env.JWT_SECRET,
        { expiresIn: '1h' }
)
}

module.exports = { generateToken };