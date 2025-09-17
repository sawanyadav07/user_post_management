const bcrypt= require('bcrypt');

const comparePassword= async (plainPassword, hashPassword)=> {
    return await bcrypt.compare(plainPassword, hashPassword);
}

module.exports= comparePassword;