const express = require("express");
const LIKECONTROLLER = require("../controllers/likeController");
const { auth } = require('../middlewares/verifyToken.js');


const router = express.Router();

router.post("/like", auth, LIKECONTROLLER.likePost);
router.post("/unlike", auth, LIKECONTROLLER.unlikePost);
router.get("/getByPost", auth, LIKECONTROLLER.getLikesByPost);

module.exports = router;
