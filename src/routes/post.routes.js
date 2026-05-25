import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

import {
  createPost,
  getAllPosts,
  getSinglePost,
  updatePost,
  deletePost,
} from "../controllers/post.controller.js";

const router = Router();

// Create Post
router.route("/create").post(verifyJWT,upload.single("image"),createPost);

// Get All Posts
router.route("/").get(getAllPosts);

// Get Single Post
router.route("/:id") .get(getSinglePost);

// Update Post
router.route("/update/:id").put(verifyJWT, upload.single("image"), updatePost);

// Delete Post
router.route("/delete/:id").delete(verifyJWT,deletePost);

export default router;