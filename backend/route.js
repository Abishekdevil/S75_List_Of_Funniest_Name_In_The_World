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
    res.status(500).json({ message: "Server Error", error });
  }
});

router.get("/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Item not found" });

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

// router.put("/items/:id", async (req, res) => {
//   const { name, description } = req.body;
//   if (!name || !description) {
//     return res.status(400).json({ message: "Both name and description are required" });
//   }

//   try {
//     const updatedItem = await Item.findByIdAndUpdate(
//       req.params.id,
//       { name, description },
//       { new: true }
//     );
//     if (!updatedItem) return res.status(404).json({ message: "Item not found" });

//     res.json({ message: "Item updated successfully", updatedItem });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });


// router.delete("/items/:id", async (req, res) => {
//   try {
//     const deletedItem = await Item.findByIdAndDelete(req.params.id);
//     if (!deletedItem) return res.status(404).json({ message: "Item not found" });

//     res.json({ message: "Item deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Server Error", error });
//   }
// });

module.exports = router;
