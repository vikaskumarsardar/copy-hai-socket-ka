const express = require("express");
const app = express();
require("dotenv").config();
const socket = require("./sockets/");
const port = process.env.PORT || 9000;
require("./app")(app);
const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

const io = require('socket.io')(server,{
  cors : {
    origin : "*"
  }
})



socket(io);
