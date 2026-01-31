const Follow = require("../models/followModel");
const User = require("../models/userModel");
const asyncHandler = require("../utils/asyncHandler");
const { createNotification } = require("../controllers/notificationController");

/* ================= FOLLOW USER ================= */
exports.followUser = async (req, res) => {
  try {
     const userToFollow = req.params.id;
  const currentUserId = req.user._id;
  console.log("userToFollow===>",userToFollow);
  
  // ❌ Cannot follow yourself
  if (userToFollow === currentUserId.toString()) {
    return res.status(400).json({
      success: false,
      message: "You cannot follow yourself"
    });
  }

  // ❌ Check user exists
  const userExists = await User.findById(userToFollow);
  if (!userExists) {
    return res.status(404).json({
      success: false,
      message: "User not found"
    });
  }

  // ❌ Already following
  const alreadyFollow = await Follow.findOne({
    follower: currentUserId,
    following: userToFollow
  });

  if (alreadyFollow) {
    return res.status(400).json({
      success: false,
      message: "Already following this user"
    });
  }

  // ✅ Follow
  await Follow.create({
    follower: currentUserId,
    following: userToFollow
  });

  // 🔔 Notification
  await createNotification({
    userId: userToFollow,
    message: `${req.user.userName} started following you`
  });

  res.status(201).json({
    success: true,
    message: "User followed successfully"
  });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
  
 
/* ================= UNFOLLOW USER ================= */
exports.unfollowUser = async (req, res) => {
  try {
  const userToUnfollow = req.params.id;
  const currentUserId = req.user._id;

  const follow = await Follow.findOneAndDelete({
    follower: currentUserId,
    following: userToUnfollow
  });

  if (!follow) {
    return res.status(400).json({
      success: false,
      message: "You are not following this user"
    });

  res.status(200).json({
    success: true,
    message: "User unfollowed successfully"
  });
};

  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
  }
 

/* ================= GET FOLLOWERS ================= */
exports.getFollowers = async (req, res) => {
  try {
      const followers = await Follow.find({ following: req.params.id })
    .populate("follower", "name userName");

  res.status(200).json({
    success: true,
    count: followers.length,
    followers
  });
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

/* ================= GET FOLLOWING ================= */
exports.getFollowing = async (req, res) => {
  try {
     const following = await Follow.find({ follower: req.params.id })
    .populate("following", "name userName");

  res.status(200).json({
    success: true,
    count: following.length,
    following
  });
  } catch (error) {
      res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }

};
