const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/verifyToken");

const FOLLOWCONTROLLER = require("../controllers/followController");

// 🔐 Protected routes
router.post("/:id/follow", auth, FOLLOWCONTROLLER.followUser);
router.delete("/:id/unfollow", auth,FOLLOWCONTROLLER.unfollowUser);

// 🌍 Public routes
router.get("/:id/followers", FOLLOWCONTROLLER.getFollowers);
router.get("/:id/following", FOLLOWCONTROLLER.getFollowing);

module.exports = router;
