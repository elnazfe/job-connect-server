const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    userType: {
      type: String,
      required: true,
      enum: ["JobSeeker", "Recruiter"],
    },
    profileImg: {
       type: String,
    },
    firstName: {
      type: String,
      // required: [true, "First name is required."],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "Last name is required."],
      trim: true,
    },
    address: {
      street: String,
      city: String,
      country: String,
    },
    notes: {
      type: String,
    }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
