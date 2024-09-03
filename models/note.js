const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true, required: true },

    body: { type: String, required: true },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
