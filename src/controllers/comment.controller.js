import Comment from "../models/comment.model.js";

import Post from "../models/post.model.js";

// Create Comment
const createComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { postId, comment } = req.body;

    // Validation
    if (!postId || !comment) {
      return res.status(400).json({
        success: false,
        message: "Post ID and comment are required",
      });
    }

    // Check Post Exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Create Comment
    const newComment = await Comment.create({
      comment,
      post: postId,
      commentedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: newComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Comments Of Post
const getPostComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({
      post: postId,
    })
      .populate(
        "commentedBy",
        "-password -refreshToken"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: comments.length,
      data: comments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Comment
const updateComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const { comment } = req.body;

    const existingComment = await Comment.findById(id);

    if (!existingComment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Ownership Check
    if (
      existingComment.commentedBy.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    existingComment.comment = comment;

    await existingComment.save();

    return res.status(200).json({
      success: true,
      message: "Comment updated successfully",
      data: existingComment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    // Ownership Check
    if (
      comment.commentedBy.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    await Comment.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Comment deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const replyToComment = async (req, res) => {
  try {
    const userId = req.user._id;

    const { postId, parentCommentId, comment } =
      req.body;

    // Validation
    if (
      !postId ||
      !parentCommentId ||
      !comment
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Post ID, parent comment ID and comment are required",
      });
    }

    // Check Parent Comment
    const parentComment =
      await Comment.findById(parentCommentId);

    if (!parentComment) {
      return res.status(404).json({
        success: false,
        message: "Parent comment not found",
      });
    }

    // Create Reply
    const reply = await Comment.create({
      comment,
      post: postId,
      commentedBy: userId,
      parentComment: parentCommentId,
    });

    return res.status(201).json({
      success: true,
      message: "Reply added successfully",
      data: reply,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  replyToComment
};