const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const itemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
}, { timestamps: true });

const Item = mongoose.model("Item", itemSchema);


router.post("/items", async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ message: "Name and description are required" });
  }

  try {
    const newItem = new Item({ name, description });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});



router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: " Internal Server Error", error });
  }
});

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


router.delete("/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ message: "Item not found" });

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});


router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name) {
      return res.status(400).json({ error: "Name is required" });
  }

  if (!email || !email.includes('@')) {
      return res.status(400).json({ error: "Invalid email format" });
  }

  if (!password || password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters long" });
  }

  res.json({ message: "User registered successfully" });
});





router.get("/", async (req, res) => {
try {
  const users = await User.find();
  res.json(users);
} catch (error) {
  res.status(500).json({ message: "Error fetching users", error });
}
});


router.get("/:id", async (req, res) => {
try {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json(user);
} catch (error) {
  res.status(500).json({ message: "Error fetching user", error });
}
});


router.put("/:id", async (req, res) => {
try {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedUser) return res.status(404).json({ message: "User not found" });

  res.json(updatedUser);
} catch (error) {
  res.status(500).json({ message: "Error updating user", error });
}
});


router.delete("/:id", async (req, res) => {
try {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) return res.status(404).json({ message: "User not found" });

  res.json({ message: "User deleted successfully" });
} catch (error) {
  res.status(500).json({ message: "Error deleting user", error });
}
});

module.exports = router;
