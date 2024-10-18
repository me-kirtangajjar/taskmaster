const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  dueDate: { type: String, required: true },
});

module.exports = model("task", taskSchema);
