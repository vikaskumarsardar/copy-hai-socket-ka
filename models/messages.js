const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "users",
    },
    groupId: {
      type: mongoose.Types.ObjectId,
      ref: "messageroom",
    },
    messages: [
      {
        type: new mongoose.Schema(
          {
            message: {
              type: String,
              default: "",
            },
          },
          {
            timestamps: true,
          }
        ),
      },
    ],
  },
  {
    timestamps: true,
  }
);

const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;
