const express = require("express");
const router = express.Router();
const uiController = require("../controllers/uiController");

router.get("/", uiController.getHome);
router.get("/register", uiController.getRegister);
router.get("/login", uiController.getLogin);
router.post("/register", uiController.postRegister);
router.post("/login", uiController.postLogin);
router.get("/dashboard", uiController.getDashboard);
router.get("/logout", uiController.logoutUser);


module.exports = router;
