const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cors = require("cors");
// import models
const User = require("./models/user.model");
const Customer = require("./models/customer-model");
const Message = require("./models/messages.model");
const Notifications = require("./models/notifications.model");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/customers-data-users")
  .then(() => console.log("Connected To DB"))
  .catch((err) => console.error(err));

// register
app.post("/api/register", async (req, res) => {
  const { name, email, password, adminRole } = req.body;
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await User.create({ name, email, password: hashedPassword, adminRole });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: error });
  }
});
// Update User (admin role)
app.patch("/api/register/:id", async (req, res) => {
  const { adminRole } = req.body;
  const { id } = req.params;
  const updateUser = { adminRole, _id: id };
  await User.findByIdAndUpdate(id, updateUser);
  res.json(updateUser);
});
// get users
app.get("/api/register", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});
// delete user
app.delete("/api/register/:id", async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ status: "Deleted" });
});
// login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (isPasswordValid) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        adminRole: user.adminRole,
      },
      "secret123"
    );
    res.json({ status: "ok", token });
  } else {
    res.json({ status: "error", token: false });
  }
});

/* Start Section Customers */
// create customer
app.post("/api/customer", async (req, res) => {
  const { name, email, job, phone, address, createdBy } = req.body;
  try {
    const newCustomer = await Customer.create({
      name,
      email,
      job,
      phone,
      address,
      createdBy,
    });
    res.json(newCustomer);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// get customer
app.post("/api/getCustomer", async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// delete customer
app.delete("/api/customer/:id", async (req, res) => {
  const { id } = req.params;
  await Customer.findByIdAndRemove(id);
  res.json({ status: "Deleted" });
});
// update customer
app.patch("/api/customer/:id", async (req, res) => {
  const { name, email, job, phone, address } = req.body;
  const { id } = req.params;
  const updateCustomer = { name, email, job, phone, address, _id: id };
  await Customer.findByIdAndUpdate(id, updateCustomer);
  res.json(updateCustomer);
});
/* End Section Customers */

/* Start Section Messages */
// Create Message
app.post("/api/messages", async (req, res) => {
  const { messageMe, createdBy } = req.body;
  try {
    const newMessage = await Message.create({ messageMe, createdBy });
    res.json(newMessage);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// get Messages
app.post("/api/getMessages", async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// Delete messages
app.delete("/api/messages", async (req, res) => {
  await Message.deleteMany();
  res.json({ status: "Deleted All Messages" });
});
/* End Section Messages */
/* Start Section Notifications */
// Create notification
app.post("/api/notifications", async (req, res) => {
  const { notification } = req.body;
  try {
    const newNotification = await Notifications.create({ notification });
    res.json(newNotification);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// Get notification
app.get("/api/notifications", async (req, res) => {
  try {
    const notifications = await Notifications.find();
    res.json(notifications);
  } catch (error) {
    res.json({ error: error.message });
  }
});
// Delete notifications
app.delete("/api/notifications", async (req, res) => {
  await Notifications.deleteMany();
  res.json({ status: "Deleted All Notifications" });
});
// Delete notification
app.delete("/api/notifications/:id", async (req, res) => {
  const { id } = req.params;
  await Notifications.findByIdAndDelete(id);
  res.json({ status: "Deleted" });
});
/* End Section Notifications */

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
