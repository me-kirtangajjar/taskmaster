const router = require("express").Router();
const { createProject } = require("../controllers/projectController");
const {
  createTask,
  getAllTasks,
  changeStatus,
  assignTaskToUser,
  updateTasks,
  addComment,
} = require("../controllers/taskController");
const {
  register,
  login,
  getProfile,
  updateProfile,
} = require("../controllers/userController");
const { checkAuth } = require("../middlewares/checkAuth");

// Users
router.route("/users/register").post(register);
router.route("/users/login").post(login);
router.route("/users/profile").get(checkAuth, getProfile).put(checkAuth,updateProfile)

// Tasks
router.route("/tasks").post(checkAuth, createTask).get(checkAuth, getAllTasks);
router.route("/tasks/:taskId").put(checkAuth, updateTasks);
router.route("/tasks/:taskId/status/:status").patch(checkAuth, changeStatus);
router.route("/tasks/:taskId/comment").patch(checkAuth, addComment);
router.route("/tasks/:taskId/users/:userId").patch(checkAuth, assignTaskToUser);

// Projects
router.route("/projects").post(checkAuth, createProject)

module.exports = router;
