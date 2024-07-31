const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, required: true },
  priority: { type: String },
  deadline: { type: Date },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Task", TaskSchema);
