const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: String,
  companyName: String,
  jobURL: String,
  description: String,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  notes: String,
  column: {
    type: String,
    enum: ["Saved", "Applied", "Pending"],
    default: "Saved",
  },
});

const Job = model("Job", jobSchema);

module.exports = Job;
