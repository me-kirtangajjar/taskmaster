const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

module.exports = {
  hashPassword: (password) => {
    return bcrypt.hash(password, 8);
  },
  comparePassword: (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
  generateToken: (payload) => {
    return jwt.sign(payload, config.JWT_SECRET, { expiresIn: "30D" });
  },
  /**
   * Verify the given JWT token with the secret stored in the env variable,
   * and return the decoded payload.
   * @param {string} token - The JWT token to verify.
   * @returns {Promise<object>} The decoded payload.
   */
  verifyToken: (token) => {
    return jwt.verify(token, config.JWT_SECRET);
  },
};
