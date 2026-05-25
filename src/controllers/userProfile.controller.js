import UserProfile from "../models/userProfile.model.js";

// Create User Profile
const createUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const {
      phoneNumber,
      gender,
      dateOfBirth,
      bio,
      education,
      address,
      profilePicture,
    } = req.body;

    // Check Existing Profile
    const existingProfile = await UserProfile.findOne({
      user: userId,
    });

    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists",
      });
    }

    // Create Profile
    const profile = await UserProfile.create({
      user: userId,
      phoneNumber,
      gender,
      dateOfBirth,
      bio,
      education,
      address,
      profilePicture,
    });

    return res.status(201).json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const profile = await UserProfile.findOne({
      user: userId,
    }).populate("user", "-password -refreshToken");

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const updateFields = {};

    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined) {
        updateFields[key] = req.body[key];
      }
    });

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user: userId },
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).populate("user", "-password -refreshToken");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User Profile
const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedProfile = await UserProfile.findOneAndDelete({
      user: userId,
    });

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};