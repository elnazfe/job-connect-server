const { Schema, model } = require("mongoose");

const recruiterSchema = new Schema(
  {
    title: String,
    employerName: String,
    jobPosition: String,
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
  