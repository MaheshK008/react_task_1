const jwt = require("jsonwebtoken");
const { secretKey } = require("./config");

module.exports = (req, res, next) => {
  try {
    let token = req.header("x-token");
    if (!token) {
      return res.status(400).send("Token not found");
    }

    let decode = jwt.verify(token,secretKey);

    req.user = decode.user;
    next();

  } catch (error) {
    return res.status(500).send(error);
  }
};
