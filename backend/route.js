const express = require("express");
const router = express.Router();

let items = [{ id: 1, name: "Devil" }];

router.post("/items", (req, res) => {
  const newItem = { id: items.length + 1, name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});


router.get("/items", (req, res) => {
  res.json(items);
});


router.get("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).json({ message: "Item not found" });
});


router.put("/items/:id", (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ message: "Item not found" });

  item.name = req.body.name || item.name;
  res.json(item);
});


router.delete("/items/:id", (req, res) => {
  items = items.filter(i => i.id !== parseInt(req.params.id));
  res.json({ message: "Item deleted" });
});

module.exports = router;
