const register = async (req, res, next) => {
    try {
        console.log("user register successfully");
        res.status(200).send("user register successfully");
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