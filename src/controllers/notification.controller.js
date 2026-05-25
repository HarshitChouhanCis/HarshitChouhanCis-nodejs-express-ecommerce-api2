import Notification from "../models/notification.model.js";

// Create Notification
const createNotification = async (
  req,
  res
) => {
  try {
    const {
      user,
      title,
      message,
      type,
    } = req.body;

    // Validation
    if (!user || !title || !message) {
      return res.status(400).json({
        success: false,
        message:
          "User, title and message are required",
      });
    }

    const notification =
      await Notification.create({
        user,
        title,
        message,
        type,
      });

    return res.status(201).json({
      success: true,
      message:
        "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Logged In User Notifications
const getMyNotifications = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const notifications =
      await Notification.find({
        user: userId,
      }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Notification As Read
const markAsRead = async (req, res) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const notification =
      await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });
    }

    // Ownership Check
    if (
      notification.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    notification.isRead = true;

    await notification.save();

    return res.status(200).json({
      success: true,
      message:
        "Notification marked as read",
      data: notification,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
const deleteNotification = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const notification =
      await Notification.findById(id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message:
          "Notification not found",
      });
    }

    // Ownership Check
    if (
      notification.user.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Notification.findByIdAndDelete(
      id
    );

    return res.status(200).json({
      success: true,
      message:
        "Notification deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createNotification,
  getMyNotifications,
 markAsRead,
  deleteNotification,
};