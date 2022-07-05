const mongoose = require('mongoose')
const messageSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const newMessageModel = mongoose.model("newmessagemodel",messageSchema)
module.exports = newMessageModel
