import Role from "../models/role.model.js";

import User from "../models/user.model.js";

// Create Role
const createRole = async (req, res) => {
  try {
    const { name, permissions } =
      req.body;

    const role = await Role.create({
      name,
      permissions,
    });

    return res.status(201).json({
      success: true,
      message:
        "Role created successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find();

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Assign Role To User
const assignRoleToUser = async (
  req,
  res
) => {
  try {
    const { userId, roleId } = req.body;

    const user = await User.findById(
      userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.role = roleId;

    await user.save({
      validateBeforeSave: false,
    });

    return res.status(200).json({
      success: true,
      message:
        "Role assigned successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createRole,
  getAllRoles,
  assignRoleToUser,
};