const express = require("express");
const router = express.Router();
const { User, Item } = require("./schema");

// 🚀 Create a new item
router.post("/items", async (req, res) => {
  const { name, description, created_by } = req.body;

  if (!name || !description || !created_by) {
    return res.status(400).json({ message: "Name, description, and created_by are required" });
  }

  try {
    const newItem = new Item({ name, description, created_by });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    console.error("❌ Error creating item:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// 📥 Get all items (or filtered by user)
router.get("/items", async (req, res) => {
  const { created_by } = req.query;

  try {
    const query = created_by ? { created_by } : {};
    const items = await Item.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// 📌 Get single item by ID
router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

// ✏️ Update item
router.put("/items/:id", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Both name and description are required" });
  }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// ❌ Delete item
router.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// 🧾 Register a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = new User({
      name,
      email,
      passwordHash: password, // In production, hash passwords
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "User registration failed", error: error.message });
  }
});

// 👥 Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("name email");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});

// Get single user
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
});

// Update user
router.put("/users/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
});

module.exports = router;
