import { Router } from "express";

import verifyJWT from "../middleware/auth.middleware.js";

import upload from "../middleware/upload.middleware.js";

import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Create Product
router
  .route("/create")
  .post(
    verifyJWT,
    upload.array("images", 5),
    createProduct
  );

// Get All Products
router
  .route("/")
  .get(getAllProducts);

// Get Single Product
router
  .route("/:id")
  .get(getSingleProduct);

// Update Product
router
  .route("/update/:id")
  .put(
    verifyJWT,
    upload.array("images", 5),
    updateProduct
  );

// Delete Product
router
  .route("/delete/:id")
  .delete(
    verifyJWT,
    deleteProduct
  );

export default router;