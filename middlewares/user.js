const jwt = require("jsonwebtoken");
exports.verifyUser = async (req, res, next) => {
  try {
    let headers = req.headers["authorization"];
    const token = headers && headers.split(" ")[1];
    const isUserVerified = await jwt.verify(token, process.env.SECRET);
    req.accessToken = isUserVerified;
    next();
  } catch (error) {
    res.writeHead(401, { "content-Type": "text/plain" });
    res.end();
  }
};
