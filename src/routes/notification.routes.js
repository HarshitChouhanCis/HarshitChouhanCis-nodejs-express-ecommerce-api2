import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  createNotification,
  getMyNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = Router();

// Create Notification
router
  .route("/create")
  .post(
    verifyJWT,
    createNotification
  );

// Get My Notifications
router
  .route("/")
  .get(
    verifyJWT,
    getMyNotifications
  );

// Mark As Read
router
  .route("/read/:id")
  .put(verifyJWT, markAsRead);

// Delete Notification
router
  .route("/delete/:id")
  .delete(
    verifyJWT,
    deleteNotification
  );

export default router;