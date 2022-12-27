const mongoose = require("mongoose");

const Notification = mongoose.Schema({
  notification: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

const model = mongoose.model("Notification", Notification);
module.exports = model;
