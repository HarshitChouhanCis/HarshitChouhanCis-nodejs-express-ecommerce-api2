import Product from "../models/product.model.js";

// Create Product
const createProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      title,
      description,
      price,
      stock,
      category,
      brand,
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory",
      });
    }

    const productData = {
      title,
      description,
      price,
      stock,
      category,
      brand,
      createdBy: userId,
    };

    // Multiple Images
    if (req.files && req.files.length > 0) {
      productData.images = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
    }

    const product = await Product.create(productData);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate(
        "createdBy",
        "-password -refreshToken"
      )
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Product
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id)
      .populate(
        "createdBy",
        "-password -refreshToken"
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Ownership Check
    if (
      product.createdBy.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const updateFields = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    });

    // Update Images
    if (req.files && req.files.length > 0) {
      updateFields.images = req.files.map((file) => ({
        data: file.buffer,
        contentType: file.mimetype,
      }));
    }

    const updatedProduct =
      await Product.findByIdAndUpdate(
        id,
        updateFields,
        {
          new: true,
          runValidators: true,
        }
      );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Ownership Check
    if (
      product.createdBy.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized",
      });
    }

    await Product.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};