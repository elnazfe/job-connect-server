const { Schema, model } = require("mongoose");

const applicationSchema = new Schema({
  job: { type: Schema.Types.ObjectId, ref: "Job" },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  notes: String,
  column: {
    type: String,
    enum: ["Received", "Rejected", "Interview", "Approved"],
    default: "Received",
  },
});

const Application = model("Application", applicationSchema);

module.exports = Application;
