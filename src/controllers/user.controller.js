import User from "../models/user.model.js";
import mongoose from "mongoose";
import UserProfile from "../models/userProfile.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    // Check Empty Fields
    if (!username || !email || !fullName || !password) {
      return res.status(400).json({
        success: false,
        message: "All required fields are mandatory"
      })
    }

    // Username Validation
    if (username.length < 3) {
      return res.status(400).json({
        success: false,
        message: "username must be at least 3 characters",
      });
    }

    // Email Validation
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Password Validation
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters",
      });
    }

    const user = await User.create({
      username,
      email,
      fullName,
      password,
    })
    
    const user1  = await User.findById(user._id)
    console.log('user1: ', user1);
    const createdUser = await User.findById(user._id).select("-password");

    // Success Response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: createdUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate Tokens
    const accessToken = user.generateAccessToken();

    const refreshToken = user.generateRefreshToken();

    // Save Refresh Token In DB
    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    // Remove Password & Refresh Token
    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      user: loggedInUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const { username, email, fullName } = req.body;

    // Dynamic Update Object
    const updateFields = {};

    if (username) updateFields.username = username;

    if (email) updateFields.email = email;

    if (fullName) updateFields.fullName = fullName;

    // Check If No Data Sent
    if (Object.keys(updateFields).length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    ).select("-password -refreshToken");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete User using transaction
// const deleteUser = async (req, res) => {

//   const session = await mongoose.startSession();

//   try {

//     // START TRANSACTION
//     session.startTransaction();

//     const userId = req.user._id;

//     // DELETE USER
//     const deletedUser = await User.findByIdAndDelete(userId)
//       .session(session);

//     if (!deletedUser) {

//       // ROLLBACK
//       await session.abortTransaction();

//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     // DELETE USER PROFILE
//     await UserProfile.deleteOne({ user: userId })
//       .session(session);

//     // COMMIT TRANSACTION
//     await session.commitTransaction();

//     return res.status(200).json({
//       success: true,
//       message: "User deleted successfully",
//     });

//   } catch (error) {

//     // ROLLBACK IF ERROR
//     await session.abortTransaction();

//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });

//   } finally {

//     // END SESSION
//     session.endSession();
//   }
// };




const resetPassword = async (req, res) => {
  try {
    const UserId = req.user._id;;

    const { oldPassword, newPassword } = req.body;

    // Find User
    const user = await User.findById(UserId);


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check Old Password
    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);
    console.log('isPasswordCorrect: ', isPasswordCorrect);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Update Password
    user.password = newPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getUserDetails = async (req, res) => {
  try {
    // User Comes From verifyJWT Middleware
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User details fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Remove Refresh Token From DB
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1,
        },
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser, updateUser, deleteUser ,resetPassword, getUserDetails, logoutUser};