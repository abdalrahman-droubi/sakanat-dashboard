const mongoose = require('mongoose');
// const crypto = require('crypto');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "please enter your name"],
    },
    email: {
      type: String,
      required: [true, "please enter your email"],
      unique: true,
      match: [
        /^\S+@\S+\.\S+$/,
        "Please enter a valid email address",
      ],
    },
    role: {  
      type:String,
      required: [true, "please enter your role"],
    },
    phoneNumber:{type:Number},
    password: {
      type: String,
      required: [true, "please enter your password"],
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    active: {type: Boolean, default: true }
  },
  {
    timestamps: true,
  }
);


const User = mongoose.model("User", UserSchema);

module.exports.User = User;
