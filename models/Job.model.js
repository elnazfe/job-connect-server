const { Schema, model } = require("mongoose");

const jobSchema = new Schema(
  {
    title: String,
    companyName: String,
    jobURL: String,
    description: String,
    status: String,
    user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
    notes: String
  }
  );
  
  const Job = model("Job", jobSchema);
  
  module.exports = Job;
  