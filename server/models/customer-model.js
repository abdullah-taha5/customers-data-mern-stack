const mongoose = require("mongoose");

const Customer = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  job: { type: String, required: true },
  phone: { type: Number, required: true },
  address: { type: String, required: true },
  createdBy: { type: String, required: true},
  date: {
    type: Date,
    default: Date.now(),
  },
});
const model = mongoose.model("CustomerData", Customer);

module.exports = model;