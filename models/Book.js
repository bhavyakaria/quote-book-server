const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  coverPicUrl: {
    type: String,
    required: false
  },
  notes: {
    type: Array,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
