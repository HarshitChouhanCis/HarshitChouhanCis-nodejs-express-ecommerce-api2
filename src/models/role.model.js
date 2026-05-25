import mongoose from "mongoose";

const { Schema } = mongoose;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "USER",
        "ADMIN",
        "SELLER",
        "MODERATOR",
      ],
    },

    permissions: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model(
  "Role",
  roleSchema
);

export default Role;