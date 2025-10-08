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

// ✅ Get Comment by commentId
exports.getCommentById = async (req, res, next) => {
  try {
    const { commentId } = req.query;
console.log("commentId>>>>",commentId);

    if (!commentId) {
      return res.status(400).json({ message: "commentId is required" });
    }

    const comment = await Comment.findById(commentId).populate("userId", "username");

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    return res.status(200).json({ message: "Comment fetched successfully!", comment });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comment", error: error.message });
  }
};

// ✅ Get All Comments for a Post
exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const { postId } = req.query;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const comments = await Comment.find({ postId }).populate("userId", "username");

    return res.status(200).json({ message: "Comments fetched successfully!", comments });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
};

// ✅ Update Comment
exports.updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    if (!text) 
      return res.status(400).json({ message: "Comment text is required" });

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to update this comment" });
    }

    comment.text = text;
    const updatedComment = await comment.save();

    return res.status(200).json({ message: "Comment updated successfully!", comment: updatedComment });
  } catch (error) {
    return res.status(500).json({ message: "Error updating comment", error: error.message });
  }
};

// Delete Comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.query;

    if (!commentId) {
      return res.status(400).json({ message: "commentId is required" });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.deleteOne();
    return res.status(200).json({ message: "Comment deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
};
