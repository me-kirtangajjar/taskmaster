const { Schema, model } = require("mongoose");

const taskSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    dueDate: { type: Date },
    comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
    assignedTo: { type: Schema.Types.ObjectId, ref: "user" },
    status: {
      type: String,
      enum: ["todo", "inprogress", "completed"],
      default: "todo",
    },
  },
  { timestamps: true }
);

module.exports = model("task", taskSchema);
