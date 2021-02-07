const express = require("express");

// User Model
const User = require('../models/User');
// Book Model
const Book = require('../models/Book');
// Note Model
const Note = require('../models/Note');

const router = express.Router();

router.post('/books', async (req, res) => {
  
  try {
    const { userId, booksList } = req.body;

    console.log(userId, booksList);

    const user = await User.findById(userId);

    booksList.forEach( async (book) => {

      // create new book
      const newBook = await new Book({
        userId: userId,
        title: book.title
      }).save();

      if (newBook) {

        // save notes
        book.notes.forEach( async (note) => {
          const bookId = newBook["id"];
          const newNote = await new Note({
            userId,
            bookId,
            note
          }).save();

          const updateBook = await Book.findById(bookId);
          updateBook.notes.push(newNote);
          updateBook.save();
        });
        user.books.push(newBook["id"]);
        // save to user
        await user.save();
      }
    });
    return res.status(201).json({ message: "Data Saved Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error " });
  }
});

router.get('/books', async (req, res) => {
  const userId = req.query.userId;

  console.log(req.query.userId);

  const user = await User.findById(userId);
  const books = user["books"];

  const booksList = [];

  for (const bookId of books) {
    const bookObj = await Book.findById(bookId);
    const noteIds = bookObj["notes"];

    const newObj = {
      title: bookObj["title"],
      notes: []
    };

    for (const nodeId of noteIds) {
      const note = await Note.findById(nodeId);
      newObj["notes"].push(note.note);
    }
    booksList.push(newObj);
  }
  return res.status(200).json({ books: booksList});
});

module.exports = router;
