const express= require("express");
const router= express.Router();
const { register, login }= require('../controllers/authController.js')
const validate = require("../middlewares/validateRequest");
const { registerValidation, loginValidation } = require("../validators/userValidation");


router.post('/register', validate(registerValidation), register);
router.post('/login', validate(loginValidation), login);

module.exports= router;

