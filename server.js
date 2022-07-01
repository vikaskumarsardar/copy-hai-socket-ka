const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
require('dotenv').config()
const server = http.createServer(app);
const port = process.env.PORT || 9000;
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user is connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


require("./app")(app);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
