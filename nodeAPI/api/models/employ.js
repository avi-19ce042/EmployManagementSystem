const mongoose = require("mongoose");

const employSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  emailId: String,
  mobileNo: Number,
  dept: String
});

module.exports = mongoose.model("Employ", employSchema);
