const jwt = require("jsonwebtoken");
const { Messages } = require("../message");
const { statusCodes } = require("../statusCodes");
const { constants } = require("../constants");

exports.generateJWTToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: constants.expiresIn,
    });
    return token;
  } catch (err) {
    throw err;
  }
};

exports.joiValidation = async (data, schema) => {
  try {
    const { error } = schema.validate(data);
    if (error) throw error.details[0]?.message;
    return;
  } catch (error) {
    throw error;
  }
};

exports.sendResponseWithCookies = async (req, res, Code, message, data) => {
  try {
    Code = Code || statusCodes.OK;
    message = message || Messages.SUCCESS;
    data = data || {};
    // res.status(Code)
    const token = data.accessToken;
    res.cookie("token", token, { HttpOnly: true,
      credentials: true,
      sameSite:'none'
     });
    // res.cookie("token",token)
    res.send({ message: message, data: data });
    // res.send({ statusCode: Code, message: message, data: data });
    return;
  } catch (error) {}
};

exports.sendResponse = (req, res, Code, message, data) => {
  try {
    Code = Code || statusCodes.OK;
    message = message || Messages.SUCCESS;
    data = data || {};
    return res
      .status(Code)
      .send({ statusCode: Code, message: message, data: data });
  } catch (err) {
    throw err;
  }
};

exports.sendErrorResponse = (req, res, Code, error) => {
  try {
    Code = Code || statusCodes.badRequest;
    error = error || Messages.BAD_REQUEST;
    return res.status(Code).send({
      statusCode: Code,
      error: error,
    });
  } catch (err) {
    throw err;
  }
};

exports.unAuthorizedResponse = (req, res, message) => {
  try {
    const Code = statusCodes.UnauthorizedAccess;
    message = message || Messages.UNAUTHORIZED_ACCESS;
    return res.status(Code).send({
      statusCode: Code,
      message: message,
      data: {},
    });
  } catch (err) {
    throw err;
  }
};

exports.AccessForbiddenResponse = (req, res, message) => {
  try {
    const Code = statusCodes.AccessForbidden;
    message = message || Messages.ACCESS_FORBIDDEN;
    return res.status(Code).send({
      statusCode: Code,
      message: message,
      data: {},
    });
  } catch (err) {
    throw err;
  }
};
