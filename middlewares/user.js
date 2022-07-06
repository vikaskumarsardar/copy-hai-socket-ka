const jwt = require("jsonwebtoken");
const { sendResponse } = require("../lib/universalFunctions");
const {statusCodes} = require('../statusCodes/')
const {Messages} = require('../message/')
const {userModel} = require('../models/')
exports.verifyUser = async (req, res, next) => {
  try {
    let headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];

    console.log(req.headers);
    const isUserVerified = await jwt.verify(token, process.env.SECRET);
    const foundUser = await userModel.findOne({
      _id : isUserVerified._id,
      accessToken : token
    }).lean().exec()
    if(!foundUser) return sendResponse(req,res,statusCodes.badRequest,Messages.BAD_REQUEST)
    req.token = isUserVerified;
    next();
  } catch (error) {
    res.writeHead(401, { "content-Type": "text/plain" });
    res.end();
  }
};
