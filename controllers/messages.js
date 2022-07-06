const { Messages } = require("../message");
const { statusCodes } = require("../statusCodes");
const models = require("../models");
const path = require('path')
const {
  universalFunctions: { sendResponse, sendErrorResponse, generateJWTToken,sendResponseWithCookies },
} = require("../lib");

exports.test = async (req, res, next) => {
  try {
    const data = {
      a : "abc",
      b : "pqr"
    }
    // res.writeHead(400,"nahin milega data", {
    //   "Content-Type": "application/json",
    //   "Content-Length" : JSON.stringify(data).length
    // });
    // res.status(404,"yel").send("soemthign")
    // res.cookie("hello","hi there how are you")
res.send("passed the test")

    
  } catch (error) {
    next(error);
  }
};

exports.userLogin = async (req, res, next) => {
  try {
    const doesExist = await models.userModel
      .findOne({
        $or: [
          { username: req.body.username },
          { email: req.body.username },
          {
            $and: [
              { phone: req.body.username },
              { countryCode: req.body.countryCode },
            ],
          },
        ],
      })
      .exec();

    if (!doesExist || doesExist.isDeleted) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.userNotFound
      );
    }
    if (!doesExist.isValid(req.body.password)) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.passwordIncorrect
      );
    }
    if (
      (doesExist.verifyMethod == Messages.email &&
        !doesExist.isEmailVerified) ||
      (doesExist.verifyMethod == Messages.phone && !doesExist.isPhoneVerified)
    ) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.accountNotVerified
      );
    }

    if (doesExist.isBlocked) {
      return sendErrorResponse(
        req,
        res,
        statusCodes.UnauthorizedAccess,
        Messages.blockedByAdmin
      );
    }
    const accesstoken = await generateJWTToken({ _id: doesExist._id });

    doesExist.accessToken = accesstoken;
    const savedUser = await doesExist.save();
    sendResponseWithCookies(
      req,
      res,
      statusCodes.OK,
      `${Messages.welcome} ${savedUser.username} `,
      { accessToken: savedUser.accessToken }
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.sendMessageToSpecific = async (req, res, next) => {
  try {
    const foundMessages = await models.personalModel
      .updateOne(
        { sender: req.token._id, reciever: req.body.reciever },
        {
          $push: {
            messages: { message: req.body.message },
          },
        },
        { upsert: true }
      )
      .lean()
      .exec();
    if (foundMessages.modifiedCount > 0 || foundMessages.upsertedCount > 0)
      sendResponse(
        req,
        res,
        statusCodes.created,
        Messages.successfullyInsertedDatas
      );
  } catch (error) {
    next(error);
  }
};

exports.getSentMessagesToIndividuals = async (req, res, next) => {
  try {
    const id = ObjectId(req.token._id);
    const reciever = ObjectId(req.body.reciever);
    const foundMessages = await models.personalModel
      .aggregate([
        {
          $match: {
            $or: [
              { sender: id, reciever: reciever },
              { reciever: id, sender: reciever },
            ],
          },
        },
        {
          $unwind: "$messages",
        },
        {
          $sort: {
            "messages.createdAt": 1,
          },
        },
        {
          $project: {
            _id: 0,
            recieverId: "$reciever",
            senderId: "$sender",
            messageId: "$messages._id",
            message: "$messages.message",
          },
        },
      ])
      .exec();
    const messages = foundMessages ? "No messages found" : Messages.SUCCESS;
    sendResponse(req, res, statusCodes.OK, messages, foundMessages);
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const id = req.token._id;
    const foundRoom = await models.roomModel
      .findOne({
        $or: [{ name: req.body.name, createdBy: id }],
      })
      .lean()
      .exec();
    if (foundRoom)
      return sendResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.ROOM_ALREADY_EXISTS
      );
    req.body.createdBy = id;
    req.body.members = [id];
    req.body.adminIds = [id];
    const newRoom = await models.roomModel.create(req.body);
    sendResponse(
      req,
      res,
      statusCodes.created,
      Messages.successfullyInsertedDatas,
      newRoom
    );
  } catch (error) {
    next(error);
  }
};

exports.sendMessageInRoom = async (req, res, next) => {
  try {
    const isUserMember = await models.roomModel
      .findOne({
        _id: req.body.id,
        members: req.token._id,
      })
      .lean()
      .exec();
    if (!isUserMember)
      return sendResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.NOT_A_MEMBER
      );

    const acknowledgements = await models.messageModel
      .updateOne(
        {
          userId: req.token._id,
          groupId: req.body.id,
        },
        {
          $push: {
            messages: {
              message: req.body.message,
            },
          },
        },
        {
          upsert: true,
        }
      )
      .lean()
      .exec();
    if (
      acknowledgements.modifiedCount > 0 ||
      acknowledgements.upsertedCount > 0
    )
      sendResponse(
        req,
        res,
        statusCodes.OK,
        Messages.successfullyInsertedDatas
      );
  } catch (error) {
    next(error);
  }
};

exports.addMembers = async (req, res, next) => {
  try {
    const doesUserExistAlready = await models.roomModel.findOne({
      adminIds: ObjectId(req.token._id),
      name: req.body.name,
      members: req.body.newUserId,
    });
    if (doesUserExistAlready)
      return sendResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.ALREADY_EXISTS
      );

    const acknowledgements = await models.roomModel
      .updateOne(
        {
          adminIds: req.token._id,
          name: req.body.name,
        },
        {
          $push: {
            members: req.body.newUserId,
          },
        }
      )
      .lean()
      .exec();

    if (
      acknowledgements.modifiedCount > 0 ||
      acknowledgements.upsertedCount > 0
    )
      return sendResponse(
        req,
        res,
        statusCodes.OK,
        Messages.successfullyInsertedDatas
      );
  } catch (error) {
    next(error);
  }
};

exports.makeAdmin = async (req, res, next) => {
  try {
    const doesUserExistAlready = await models.roomModel.findOne({
      adminIds: ObjectId(req.token._id),
      name: req.body.name,
      members: req.body.newUserId,
    });

    console.log(doesUserExistAlready);
    if (doesUserExistAlready)
      return sendResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.ALREADY_EXISTS
      );

    const acknowledgements = await models.roomModel
      .updateOne(
        {
          adminIds: req.token._id,
          name: req.body.name,
        },
        {
          $push: {
            adminIds: req.body.newAdminId,
          },
        }
      )
      .lean()
      .exec();

    if (
      acknowledgements.modifiedCount > 0 ||
      acknowledgements.upsertedCount > 0
    )
      return sendResponse(
        req,
        res,
        statusCodes.OK,
        Messages.successfullyInsertedDatas
      );
  } catch (error) {
    next(error);
  }
};

exports.getGroupMessages = async (req, res, next) => {
  try {
    const isUserMember = await models.roomModel
      .findOne({
        _id: req.body.id,
        members: req.token._id,
      })
      .lean()
      .exec();
    if (!isUserMember)
      return sendResponse(
        req,
        res,
        statusCodes.badRequest,
        Messages.NOT_A_MEMBER
      );

    const foundMessages = await models.messageModel
      .aggregate([
        {
          $match: { groupId: ObjectId(req.body.id) },
        },
        {
          $unwind: "$messages",
        },
        {
          $sort: {
            "messages.createdAt": 1,
          },
        },
        {
          $project: {
            _id: 0,
            groupId: "$_id",
            userId: "$userId",
            message: "$messages.message",
            messageId: "$messages._id",
          },
        },
      ])
      .exec();
    sendResponse(req, res, statusCodes.OK, Messages.SUCCESS, foundMessages);
  } catch (error) {
    next(error);
  }
};


exports.defaultPage = async(req,res,next) =>{
  try{
    res.sendFile(path.resolve('public/index.html'))
  }
  catch(error){
    next(error)
  }
  
}