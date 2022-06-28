const mongoose = require("mongoose");
const employee = require("./employee");

let projects = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    ref: "employee"
    // required: true,
    // unique: true,
  },
  status: {
    type: String,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("projects_col", projects);
