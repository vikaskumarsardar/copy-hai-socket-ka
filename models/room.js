const mongoose = require("mongoose");
const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Message Room",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    adminIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
    members: [
      {
        type: mongoose.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const groupRoomModel = mongoose.model("messageroom", roomSchema);
module.exports = groupRoomModel;
