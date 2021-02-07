const mongoose = require("mongoose");
const NoteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  bookId: {
    type: String,
    required: false
  },
  note: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
