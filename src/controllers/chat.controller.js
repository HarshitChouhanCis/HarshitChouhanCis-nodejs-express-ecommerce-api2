import Chat from "../models/chat.model.js";

// Send Message
const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;

    const { receiver, message } = req.body;

    // Validation
    if (!receiver || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Receiver and message are required",
      });
    }

    const chatData = {
      sender: senderId,
      receiver,
      message,
    };

    // Optional Image
    if (req.file) {
      chatData.image = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }

    const chat = await Chat.create(
      chatData
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: chat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Conversation
const getConversation = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { receiverId } = req.params;

    const chats = await Chat.find({
      $or: [
        {
          sender: userId,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: userId,
        },
      ],
    })
      .populate(
        "sender",
        "username email"
      )
      .populate(
        "receiver",
        "username email"
      )
      .sort({ createdAt: 1 });

    return res.status(200).json({
      success: true,
      count: chats.length,
      data: chats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Messages As Seen
const markMessagesAsSeen = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { senderId } = req.params;

    await Chat.updateMany(
      {
        sender: senderId,
        receiver: userId,
        isSeen: false,
      },
      {
        isSeen: true,
      }
    );

    return res.status(200).json({
      success: true,
      message:
        "Messages marked as seen",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Message
const deleteMessage = async (
  req,
  res
) => {
  try {
    const userId = req.user._id;

    const { id } = req.params;

    const message = await Chat.findById(
      id
    );

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Ownership Check
    if (
      message.sender.toString() !==
      userId.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Chat.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message:
        "Message deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  sendMessage,
  getConversation,
  markMessagesAsSeen,
  deleteMessage,
};