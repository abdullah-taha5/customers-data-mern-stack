const mongoose = require("mongoose");

const User = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  adminRole: { type: Boolean, required: true },
});

const model = mongoose.model("User", User);
module.exports = model;
