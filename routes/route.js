const router = require("express").Router();
const { createTask } = require("../controllers/taskController");
const { register, login } = require("../controllers/userController");
const { checkAuth } = require("../middlewares/checkAuth");

router.route("/users/register").post(register);
router.route("/users/login").post(login);
router.route("/users/profile").get();

router.route("/tasks").post(checkAuth, createTask);

module.exports = router;
