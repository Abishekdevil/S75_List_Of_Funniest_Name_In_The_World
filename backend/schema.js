const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  created_by: { type: String, required: true }, 
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
const Item = mongoose.model("Item", itemSchema);

module.exports = { User, Item };
