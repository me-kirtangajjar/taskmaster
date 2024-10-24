const responseMessage = require("../constant/responseMessage");
const httpError = require("../util/httpError");
const quicker = require("../util/quicker");

const checkAuth = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      httpError(next, new Error(responseMessage.NOT_FOUND("token")), req);
    }

    token = token.split(" ")[1];

    const isTokenValid = quicker.verifyToken(token);

    next();
  } catch (err) {
    httpError(next, err, req);
  }
};
module.exports = { checkAuth };
