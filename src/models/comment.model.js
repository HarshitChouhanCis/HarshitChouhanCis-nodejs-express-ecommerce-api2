import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    commentedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model(
  "Comment",
  commentSchema
);

export default Comment;