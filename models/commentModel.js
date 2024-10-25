const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  content: { type: String, required: true, trim: true },
  author: { type: Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = model("comment", commentSchema);
