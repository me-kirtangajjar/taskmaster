const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, trim: true },
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
});

module.exports = model("user", userSchema);
