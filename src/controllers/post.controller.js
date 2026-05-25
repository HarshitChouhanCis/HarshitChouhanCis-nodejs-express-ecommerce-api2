import Post from "../models/post.model.js";

// Create Post
const createPost = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required",
      });
    }

    const postData = {
      title,
      description,
      createdBy: userId,
    };

    // Image Upload
    if (req.file) {
      postData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const post = await Post.create(postData);

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("createdBy", "-password -refreshToken")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Post
const getSinglePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id).populate(
      "createdBy",
      "-password -refreshToken"
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Post
const updatePost = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership Check
    if (post.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const updateFields = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    });

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Post
const deletePost = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Ownership Check
    if (post.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
};