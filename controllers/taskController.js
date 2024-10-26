const responseMessage = require("../constant/responseMessage");
const taskModel = require("../models/taskModel");
const taskService = require("../services/taskService");
const httpError = require("../util/httpError");
const httpResponse = require("../util/httpResponse");

const createTask = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const payload = { title, description, dueDate, assignedTo: req.uId };

    const task = await taskService.createNewTask(payload);
    httpResponse(req, res, 201, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const { title, description, status } = req.body;

    // Initialize the query with the assignedTo filter only
    const query = { assignedTo: req.uId };

    // Add additional filters if provided in the body
    if (title) query.title = title;
    if (description) query.description = description;
    if (status) query.status = status;

    const tasks = await taskModel.find(query);
    httpResponse(req, res, 200, responseMessage.SUCCESS, tasks);
  } catch (err) {
    httpError(next, err, req);
  }
};

const changeStatus = async (req, res, next) => {
  try {
    const { taskId, status } = req.params;
    const task = await taskService.changeStatus(taskId, status);
    httpResponse(req, res, 200, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

const assignTaskToUser = async (req, res, next) => {
  try {
    const { taskId, userId } = req.params;
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { assignedTo: userId },
      { new: true }
    );
    httpResponse(req, res, 200, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

const updateTasks = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    const task = await taskModel.findByIdAndUpdate(
      req.params.taskId,
      {
        title,
        description,
        dueDate,
      },
      { new: true }
    );

    httpResponse(req, res, 200, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { comment } = req.body;
    const task = await taskModel.findByIdAndUpdate(
      taskId,
      { $push: { comments: req.uId } },
      { new: true }
    );
    httpResponse(req, res, 200, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  changeStatus,
  assignTaskToUser,
  updateTasks,
  addComment,
};
