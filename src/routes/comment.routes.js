import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
  replyToComment
} from "../controllers/comment.controller.js";

const router = Router();

// Create Comment
router
  .route("/create")
  .post(verifyJWT, createComment);

// Get All Comments Of Specific Post
router
  .route("/post/:postId")
  .get(getPostComments);

// Update Comment
router
  .route("/update/:id")
  .put(verifyJWT, updateComment);

// Delete Comment
router
  .route("/delete/:id")
  .delete(verifyJWT, deleteComment);

router
  .route("/reply")
  .post(verifyJWT, replyToComment);

export default router;