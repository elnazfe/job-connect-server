const { Schema, model } = require("mongoose");

const recruiterSchema = new Schema(
  {
    jobPosition: String,
    employeeName: String,
    description: String,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    notes: String,
    column: {
      type: String,
      enum: ["Received", "Rejected", "Interview"],
      default: "Received",
    },
  });
  
  const Recruiter = model("Recruiter", recruiterSchema);
  
  module.exports = Recruiter;
  