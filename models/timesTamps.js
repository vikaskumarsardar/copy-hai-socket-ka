const mongoose = require("mongoose");
const insideSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
    },
    reciever: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
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
            timestamps: true
          }
        )
      },
    ],
  },
  {
    timestamps: true,
  }
);

const timeStampsModel = mongoose.model("timesNow", insideSchema);
module.exports = timeStampsModel;
