import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

// Add To Cart
router
  .route("/add")
  .post(verifyJWT, addToCart);

// Get My Cart
router
  .route("/")
  .get(verifyJWT, getMyCart);

// Update Quantity
router
  .route("/update/:id")
  .put(
    verifyJWT,
    updateCartQuantity
  );

// Remove Item
router
  .route("/remove/:id")
  .delete(
    verifyJWT,
    removeCartItem
  );

// Clear Cart
router
  .route("/clear")
  .delete(verifyJWT, clearCart);

export default router;