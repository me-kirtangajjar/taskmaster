const { default: mongoose } = require("mongoose");
const config = require("../config/config");
const userModel = require("../models/userModel");
const taskModel = require("../models/taskModel");

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(config.DATABASE_URL.toString());
      return mongoose.connection;
    } catch (err) {
      throw err;
    }
  },
  findUserByEmail: (email) => {
    return userModel.findOne({ email });
  },
  registerUser: async (payload) => {
    return userModel.create(payload);
  },
  createNewTask: async (payload) => {
    return taskModel.create(payload);
  },
};
