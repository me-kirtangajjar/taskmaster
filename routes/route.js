const router = require("express").Router();
const { register, login } = require("../controllers/userController");
const httpError = require("../util/httpError");

router.route("/").get((req, res, next) => {
  try {
    throw new Error("her");
  } catch (err) {
    httpError(next, err, req);
  }
});
router.route("/register").post(register);
router.route("/login").post(login);

module.exports = router;
