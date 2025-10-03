const Comment = require("../models/commentModel");

exports.createComment = async (req, res, next) => {
  try {
    const { text } = req.body;
    const {  postId } = req.query; 
      const userId = req.user._id;

    const commentPayload={ 
        userId,
        postId,
        text: text 
    }
    if (!text) 
      return res.status(400).json({ message: "Comment text is required" });

    const findComment = await Comment.findOne(commentPayload);

    if (findComment) {
      return res.status(409).json({ message: "Comment already exists for this post!" });
    }

    const newComment = await Comment.create(commentPayload);

    return res.status(201).json({ message: "Comment created successfully!", comment: newComment });

  } catch (error) {
    return res.status(500).json({ message: "Error creating comment", error: error.message });
  }
};

// ✅ Get All Comments for a Post
exports.getCommentsByPost = async (req, res, next) => {
  try {
    const { postId } = req.query;

    if (!postId) return res.status(400).json({ message: "Post ID is required" });

    const comments = await Comment.find({ postId }).populate("userId", "username");
    return res.status(200).json({ message: "Comments fetched successfully!", comments });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};