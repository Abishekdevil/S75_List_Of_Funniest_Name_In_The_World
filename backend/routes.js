const express = require("express");
const router = express.Router();


let items = [{ id: 1, name: "Devil" }];


router.post("/items", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  const newItem = { id: items.length + 1, name };
  items.push(newItem);
  res.status(201).json(newItem);
});

router.get("/items", (req, res) => {
  res.json(items);
});

router.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  res.json(item);
});


router.put("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = req.body.name || item.name;
  res.json({ message: "Item updated successfully", item });
});

router.delete("/items/:id", (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) return res.status(404).json({ message: "Item not found" });

  items.splice(itemIndex, 1);
  res.json({ message: "Item deleted successfully" });
});

module.exports = router;
