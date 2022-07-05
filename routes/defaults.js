const express = require("express");
const path = require('path')
const Router = express.Router();
const {
  isUserVerified: { verifyUser },
} = require("../middlewares/");
const { message } = require("../controllers");

// Router.get('/',message.defaultPage)
Router.post("/chatting", async (req, res, next) => {
  try {
    res.render("chatting");
    // res.sendFile(path.resolve('public/index.html'))
  } catch (error) {
    next(error);
  }
});

Router.get("/login", async (req, res, next) => {
  res.render('login');
});
module.exports = Router;
