const responseMessage = require("../constant/responseMessage");
const databaseService = require("../services/databaseService");
const httpError = require("../util/httpError");
const httpResponse = require("../util/httpResponse");

const createTask = (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;
    const payload = { title, description, dueDate };

    const task = databaseService.createNewTask(payload);
    httpResponse(req, res, 201, responseMessage.SUCCESS, task);
  } catch (err) {
    httpError(next, err, req);
  }
};

module.exports = { createTask };
