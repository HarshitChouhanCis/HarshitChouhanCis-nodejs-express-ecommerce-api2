import Cart from "../models/cart.model.js";

import Product from "../models/product.model.js";

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const { productId, quantity } = req.body;

    // Validation
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    // Check Product Exists
    const product = await Product.findById(
      productId
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Existing Cart Item
    const existingCartItem =
      await Cart.findOne({
        user: userId,
        product: productId,
      });

    // Increase Quantity
    if (existingCartItem) {
      existingCartItem.quantity +=
        quantity || 1;

      await existingCartItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        data: existingCartItem,
      });
    }

    // Create Cart Item
    const cart = await Cart.create({
      user: userId,
      product: productId,
      quantity: quantity || 1,
    });

    return res.status(201).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged In User Cart
const getMyCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const cartItems = await Cart.find({
      user: userId,
    })
      .populate("product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: cartItems.length,
      data: cartItems,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Cart Quantity
const updateCartQuantity = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be greater than 0",
      });
    }

    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Ownership Check
    if (
      cartItem.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    cartItem.quantity = quantity;

    await cartItem.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: cartItem,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Remove Cart Item
const removeCartItem = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const cartItem = await Cart.findById(id);

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Ownership Check
    if (
      cartItem.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Cart.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Clear Entire Cart
const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await Cart.deleteMany({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  addToCart,
  getMyCart,
  updateCartQuantity,
  removeCartItem,
  clearCart,
};