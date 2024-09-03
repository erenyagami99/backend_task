const express = require("express");
const Note = require("../models/note");
const router = express.Router();

router.post("/notes", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/notes", async (req, res) => {
  try {
    const { title } = req.query;

    if (!title) {
      return res
        .status(400)
        .json({ error: "Title query parameter is required" });
    }

    const notes = await Note.find({ title: new RegExp(title, "i") });

    if (notes.length === 0) {
      return res
        .status(404)
        .json({ message: "No notes found with the given title substring" });
    }

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/notes/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, body: req.body.body },
      { new: true, runValidators: true }
    );
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
