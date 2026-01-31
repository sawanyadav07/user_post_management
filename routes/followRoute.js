const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/verifyToken");

const {
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} = require("../controllers/followController");

// 🔐 Protected routes
router.post("/:id/follow", auth, followUser);
router.delete("/:id/unfollow", auth, unfollowUser);

// 🌍 Public routes
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

module.exports = router;
