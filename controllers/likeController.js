const Like = require("../models/likeModel");
const Post = require("../models/postModel");
const { createNotification } = require('./notificationController');

// ✅ Like a Post
exports.likePost = async (req, res) => {
  try {
    const postId = req.query.id;
    const userId = req.user._id;
    
    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    // ✅ 1. Find post (IMPORTANT)
    const post = await Post.findById(postId);
   
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const like = await Like.findOne({ postId, userId });
    if (like) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const newLike = await Like.create({ userId, postId });
    console.log(newLike);


    // 🔔 CREATE NOTIFICATION (only if liker is not post owner)
    if (post && req?.user?._id && !post.userId.equals(req.user._id)) {

      await createNotification({
        userId: post.userId, // post owner
        message: `${req.user.name} liked your post`,
      });
    }

    return res.status(201).json({ message: "Post liked successfully!", like: newLike });
  } catch (error) {
    return res.status(500).json({ message: "Error liking post", error: error.message });
  }
};

// ✅ Unlike a Post
exports.unlikePost = async (req, res) => {
  try {
    const postId = req.query.id;
    const userId = req.user._id;
    console.log(userId);


    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const like = await Like.findOneAndDelete({ postId, userId });

    if (!like) {
      return res.status(404).json({ message: "You have not liked this post" });
    }

    return res.status(200).json({ message: "Post unliked successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error unliking post", error: error.message });
  }
};

// ✅ Get all likes for a Post
exports.getLikesByPost = async (req, res) => {
  try {
    const postId = req.query.id;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const likes = await Like.find({ postId }).populate("userId", "username");

    return res.status(200).json({ message: "Likes fetched successfully!", likes });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching likes", error: error.message });
  }
};
