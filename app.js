const express = require("express");
const cors = require("cors");
const path = require("path");
module.exports = (app) => {
  app.use(express.json());
  app.use(
    cors({
      origin: "*",
    })
  );
  app.use("/static", express.static(path.resolve("public")));
  app.use("/api", require("./routes"));
  require("./database/");
};
