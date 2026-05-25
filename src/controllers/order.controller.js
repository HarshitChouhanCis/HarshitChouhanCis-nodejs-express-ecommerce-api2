import Order from "../models/order.model.js";

import Cart from "../models/cart.model.js";

// Create Order From Cart
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      shippingAddress,
      paymentMethod,
    } = req.body;

    // Get Cart Items
    const cartItems = await Cart.find({
      user: userId,
    }).populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    let totalAmount = 0;

    const products = cartItems.map((item) => {
      const itemTotal =
        item.product.price * item.quantity;

      totalAmount += itemTotal;

      return {
        product: item.product._id,
        quantity: item.quantity,
        price: item.product.price,
      };
    });

    // Create Order
    const order = await Order.create({
      user: userId,
      products,
      totalAmount,
      shippingAddress,
      paymentMethod,
    });

    // Clear Cart After Order
    await Cart.deleteMany({
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged In User Orders
const getMyOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({
      user: userId,
    })
      .populate("products.product")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Order
const getSingleOrder = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const order = await Order.findById(id)
      .populate("products.product");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership Check
    if (
      order.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      orderStatus,
      paymentStatus,
    } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (orderStatus) {
      order.orderStatus = orderStatus;
    }

    if (paymentStatus) {
      order.paymentStatus =
        paymentStatus;
    }

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order updated successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Ownership Check
    if (
      order.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createOrder,
  getMyOrders,
  getSingleOrder,
  updateOrderStatus,
  cancelOrder,
};