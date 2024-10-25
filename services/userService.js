const userModel = require("../models/userModel");

module.exports = {
  findUserByEmail: (email) => {
    return userModel.findOne({ email });
  },
  registerUser: async (payload) => {
    return userModel.create(payload);
  },
};
