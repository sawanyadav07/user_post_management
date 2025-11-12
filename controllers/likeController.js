const Like = require("../models/likeModel");

// ✅ Like a Post
exports.likePost = async (req, res) => {
  try {
    
    const  postId  = req.query.id;
    const userId = req.user._id;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const like = await Like.findOne({ postId, userId });
    if (like) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    const newLike = await Like.create({ userId, postId }); 

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
    const  postId  = req.query.id;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const likes = await Like.find({ postId }).populate("userId", "username");

    return res.status(200).json({ message: "Likes fetched successfully!", likes });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching likes", error: error.message });
  }
};
