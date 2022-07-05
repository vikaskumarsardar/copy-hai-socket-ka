const express = require("express");
const cors = require("cors");
const path = require("path");
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.text())
  app.use(
    cors({
      origin: "*",
    })
    );
    app.set('view engine','ejs')
  app.use(express.static(path.resolve('public')))
  require("./database/");
  app.use("/api", require("./routes"));
};
