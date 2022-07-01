const { url } = require("./config/config");
const mongoose = require("mongoose");
mongoose
  .connect(url)
  .then(() => console.log(`successfully connected to the ${url}`))
  .catch((err) => console.log("cannot connect to the server"));
