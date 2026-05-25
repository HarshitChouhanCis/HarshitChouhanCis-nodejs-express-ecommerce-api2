import { Router } from "express";

import {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  resetPassword,
  getUserDetails,
  logoutUser
} from "../controllers/user.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/update").put(verifyJWT, updateUser);

router.route("/delete").delete(verifyJWT, deleteUser);

// router.route("/forgot-password").post(forgotPassword);
router.route("/me").get(verifyJWT, getUserDetails);

router.route("/reset-password").post(verifyJWT,resetPassword);

router.route("/logout").post(verifyJWT, logoutUser);
export default router;