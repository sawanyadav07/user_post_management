const Post = require('../models/postModel.js');

// Create Post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const postUserId = req.user._id; 

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const postPayload = {
      title,
      content,
      userId: postUserId
    };
    console.log("🚀 ~ postPayload:", postPayload)

    // ✅ using .create()
    const post = await Post.create(postPayload);
    console.log("🚀 ~ post:", post)

    return res.status(201).json({ message: "Post created successfully!", post });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error: error.message });
  }
};


// Get All Posts
exports.getPost = async (req, res, next) => {
  try {
    const posts = await Post.find()
    res.status(200).json({ message: "get post successfully!" })
  } catch (error) {
    res.status(500).json({ message: "error", error: error.message });
  }
}

// Update Post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    if (title) updatePayload.title = title;
    if (content) updatePayload.content = content;


    if (Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: updatePayload },
      { new: true }
    );

    if (!updatedPost) return res.status(400).json({ message: "Post not found" });
    return res.status(200).json({ message: "Post updated successfully!", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
}

// Delete Post
exports.deletePost = async (req, res, next) => {
  try {
    res.status(200).json({ message: "delete post successfully!" })
  } catch (error) {
    res.status(500).json({ message: "error" })
  }
}



