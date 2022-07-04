const express = require("express");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const app = express();
const port = 9000;

mongoose
  .connect("mongodb://localhost:27017/messageKarneKa")
  .then(() => console.log("successfully connected to the server"))
  .catch(() => console.log("cannot connect to the server"));

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

const messageModel = mongoose.model("messageModelBananeKa", messageSchema);

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


app.get('/something',async(req,res)=>{
  res.send("you are hired")
})

const io = new Server(server);
app.get("/chatting/:id", async (req, res) => {
  try {
    io.on("connection", (socket) => {
      console.log("a user is connected ", socket.id);
      socket.on("chat message", async (messages) => {
        // await handleDBS(messages, socket);
        console.log(req.params.id);
        socket.broadcast.emit("chat message", messages);
      });

      socket.on("disconnect", (...args) => {
        console.log("a user is disconnected", socket.id);
      });
    });

    res.sendFile(__dirname + "/index.html");
  } catch (error) {
    next(error);
  }
});
const handleDBS = async (messages, socket) => {
  try {
    const newMessage = new messageModel({
      username: messages.username,
      id: socket.id,
      message: messages.messages,
    });
    const saved = await newMessage.save();
    console.log(saved);
  } catch (error) {
    throw error;
  }
};
