import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

import {
  sendMessage,
  getConversation,
  markMessagesAsSeen,
  deleteMessage,
} from "../controllers/chat.controller.js";

const router = Router();

// Send Message
router
  .route("/send")
  .post(
    verifyJWT,
    upload.single("image"),
    sendMessage
  );

// Get Conversation
router
  .route("/:receiverId")
  .get(
    verifyJWT,
    getConversation
  );

// Mark Seen
router
  .route("/seen/:senderId")
  .put(
    verifyJWT,
    markMessagesAsSeen
  );

// Delete Message
router
  .route("/delete/:id")
  .delete(
    verifyJWT,
    deleteMessage
  );

export default router;