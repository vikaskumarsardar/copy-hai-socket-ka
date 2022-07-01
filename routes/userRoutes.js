const express = require("express");
const Router = express.Router();
const { isUserVerified } = require("../middlewares");
const { message } = require("../controllers/");

Router.get("/test", message.test);
Router.post("/login", message.userLogin);
Router.post(
  "/sendMessages",
  isUserVerified.verifyUser,
  message.sendMessageToSpecific
);
Router.get(
  "/getIndividualMessages",
  isUserVerified.verifyUser,
  message.getSentMessagesToIndividuals
);
Router.post(
  "/sendInRoom",
  isUserVerified.verifyUser,
  message.sendMessageInRoom
);
Router.post("/createRoom", isUserVerified.verifyUser, message.createRoom);
Router.get(
  "/getGroupMessages",
  isUserVerified.verifyUser,
  message.getGroupMessages
);
Router.post("/addMember", isUserVerified.verifyUser, message.addMembers);

module.exports = Router;
