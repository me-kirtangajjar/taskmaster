const responseMessage = require("../constant/responseMessage");
const projectModel = require("../models/projectModel");
const httpError = require("../util/httpError");
const httpResponse = require("../util/httpResponse");

const createProject = async (req, res, next) => {
  try {
    const { title, description, dueDate } = req.body;

    const project = await projectModel.create({ title, description, dueDate });
    httpResponse(req, res, 201, responseMessage.SUCCESS, project);
  } catch (err) {
    httpError(next, err, req);
  }
};

module.exports = { createProject };
