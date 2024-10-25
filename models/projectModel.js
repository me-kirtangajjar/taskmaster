const { Schema, model } = require("mongoose");
const { schema } = require("./taskModel");

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: "task" }],
    status: {
      type: String,
      enum: ["todo", "inprogress", "completed"],
      default: "todo",
    },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = model("project", projectSchema);
