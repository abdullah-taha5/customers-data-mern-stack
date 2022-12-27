const mongoose = require("mongoose");

const Message = mongoose.Schema({
  messageMe: { type: String, required: true },
  createdBy: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const model = mongoose.model("Message", Message);

module.exports = model;
