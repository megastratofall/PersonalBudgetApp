const express = require("express");
const router = express.Router();
const TransactionsSchema = require("../models/Transaction");

//create transaction
router.post("/", (req, res) => {
  const transaction = TransactionsSchema(req.body);
  transaction
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get all transactions
router.get("/", (req, res) => {
  TransactionsSchema.find()
    .sort({ createdAt: -1 })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get an specific transaction
router.get("/:id", (req, res) => {
  const { id } = req.params;
  TransactionsSchema.findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update a transaction
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { amount, concept, currentOption } = req.body;
  TransactionsSchema.updateOne(
    { _id: id },
    { $set: { amount, concept, currentOption } }
  )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete transaction
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  TransactionsSchema.deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
