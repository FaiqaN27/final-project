import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Defines the role as either 'user' or 'admin'
      default: "user", // Default role is 'user'
    },
  },
  {
    timestamps: true, // CreatedAt , UpdatedAt
  }
);

const User = mongoose.model("User", userSchema);

export default User;
