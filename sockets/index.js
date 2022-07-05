const { newMessage } = require("../models/");

module.exports = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("a user is connected ", socket.id);
      socket.on("chat message", async (messages) => {
        await handleDBS(messages, socket);
        socket.broadcast.emit("chat message", messages);
      });

      socket.on("disconnect", (...args) => {
        console.log("a user is disconnected", socket.id);
      });
    });
  } catch (err) {
    console.log(err);
  }
};
const handleDBS = async (messages, socket) => {
  try {
    const newMsg = new newMessage({
      username: messages.username,
      message: messages.messages,
    });
    await newMsg.save();
  } catch (error) {
    throw error;
  }
};
