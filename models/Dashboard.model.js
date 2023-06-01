const { Schema, model } = require("mongoose");

const dashboardSchema = new Schema(
  {

  }
  );
  
  const Dashboard = model("Dashboard", dashboardSchema);
  
  module.exports = Dashboard;
  