const express = require("express");
const { Server } = require("socket.io");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = new Server(server);
const port = 9000;

app.get("/", async (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  socket.on("hello from client", (...args) => {
    // ...
  });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
