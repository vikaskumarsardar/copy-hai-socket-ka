const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    salt: String,
    encryptedPassword: String,
    username: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    accessToken: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    countryCode: {
      type: String,
      default: "",
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    OTP: String,
    emailOTP: String,
    verifyMethod: {
      type: String,
      default: "",
    },
    expireTokenIn: Number,
    resetToken: String,
  },
  {
    timestamps: true,
  }
);

require("./virtual")(userSchema);

const userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
