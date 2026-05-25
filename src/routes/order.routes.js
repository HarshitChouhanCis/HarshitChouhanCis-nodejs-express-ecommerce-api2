import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";

const router = Router();

// Create Order
router
  .route("/create")
  .post(verifyJWT, createOrder);

// Get My Orders
router
  .route("/")
  .get(verifyJWT, getMyOrders);

// Get Single Order
router
  .route("/:id")
  .get(verifyJWT, getSingleOrder);

// Update Order Status
router
  .route("/update/:id")
  .put(
    verifyJWT,
    updateOrderStatus
  );

// Cancel Order
router
  .route("/cancel/:id")
  .put(
    verifyJWT,
    cancelOrder
  );

export default router;