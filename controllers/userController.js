const responseMessage = require("../constant/responseMessage");
const userModel = require("../models/userModel");
const userService = require("../services/userService");
const httpError = require("../util/httpError");
const httpResponse = require("../util/httpResponse");
const quicker = require("../util/quicker");

const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (user) {
      return httpError(
        next,
        new Error(responseMessage.ALREADY_EXISTS("user", email)),
        req
      );
    }

    const payload = {
      firstName,
      lastName,
      email,
      password: await quicker.hashPassword(password),
    };
    const newUser = await userService.registerUser(payload);
    httpResponse(req, res, 201, responseMessage.SUCCESS, newUser);
  } catch (error) {
    return httpError(
      next,
      new Error(responseMessage.SOMETHING_WENT_WRONG),
      req
    );
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.findUserByEmail(email);
    if (!user) {
      httpError(next, new Error(responseMessage.NOT_FOUND(email)), req);
    }

    const isValidPassword = await quicker.comparePassword(
      password,
      user.password
    );
    if (!isValidPassword) {
      httpError(next, new Error(responseMessage.INVALID_CREDENTIALS), req);
    }

    const token = quicker.generateToken({
      id: user._id,
      email: user.email,
    });

    httpResponse(req, res, 200, responseMessage.SUCCESS, { token });
  } catch (error) {
    return res.status(500).json({ error: "Something went wrong, Try again" });
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { uEmail } = req;

    const user = await userService.findUserByEmail(uEmail);

    if (!user) {
      httpError(next, new Error(responseMessage.NOT_FOUND("user")), req);
    }

    httpResponse(req, res, 200, responseMessage.SUCCESS, user);
  } catch (err) {
    httpError(next, err, req);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (password) password = await quicker.hashPassword(password);

    const user = await userModel.findByIdAndUpdate(
      req.uId,
      {
        firstName,
        lastName,
        email,
        password,
      },
      { new: true }
    );
    httpResponse(req, res, 200, responseMessage.SUCCESS, user);
  } catch (err) {
    httpError(next, err, req);
  }
};

module.exports = { register, login, getProfile, updateProfile };
