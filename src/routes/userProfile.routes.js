import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from "../controllers/userProfile.controller.js";

const router = Router();

// Create Profile
router
  .route("/create")
  .post(verifyJWT, createUserProfile);

// Get Logged In User Profile
router
  .route("/me")
  .get(verifyJWT, getUserProfile);

// Update Profile
router
  .route("/update")
  .put(verifyJWT, updateUserProfile);

// Delete Profile
router
  .route("/delete")
  .delete(verifyJWT, deleteUserProfile);

export default router;