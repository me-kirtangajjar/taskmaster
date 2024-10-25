const taskModel = require("../models/taskModel");

module.exports = {
  createNewTask: async (payload) => {
    return taskModel.create(payload);
  },
  getAllUserTask: async (userId) => {
    return taskModel.find({ assignedTo: userId });
  },
  changeStatus: async (taskId, status) => {
    const task = taskModel.findByIdAndUpdate(taskId, { status }, { new: true });
    return task;
  },
};
