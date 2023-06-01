const { Schema, model } = require("mongoose");

const dashboardSchema = new Schema(
  {
      user: [ { type: Schema.Types.ObjectId, ref:'User' } ],
      job: [ { type: Schema.Types.ObjectId, ref:'Job' } ]
  }
  );
  
  const Dashboard = model("Dashboard", dashboardSchema);
  
  module.exports = Dashboard;
  