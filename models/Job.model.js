const { Schema, model } = require("mongoose");

const jobSchema = new Schema({
  title: String,
  companyName: String,
  jobURL: String,
  description: String,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  notes: String,
  status: {
    type: String,
    enum: ["open", "closed", "user"],
    default: "open",
  },
  column: {
    type: String,
    enum: ["Saved", "Applied", "Pending"],
    default: "Saved",
  },
  type: {
    type: String,
    enum: ["recruiter", "user"],
    default: "user",
  },
});

const Job = model("Job", jobSchema);

module.exports = Job;
