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
    const userId = req.body.userId;
    const booksList = req.body.bookList;

    const user = await User.findById(userId);

    booksList.forEach( async (book) => {

      // create new book
      let newBook = await Book.findOne({ title: book.title });

      if (!newBook) {
        newBook = await new Book({
          userId: userId,
          title: book.title
        }).save();
        user.books.push(newBook["id"]);
        await user.save();
      }

      if (newBook) {

        // save notes
        book.notes.forEach( async (note) => {
          const bookId = newBook["id"];

          let newNote = await Note.findOne({ note: note, bookId: bookId });

          if (!newNote) {
            newNote = await new Note({
              userId,
              bookId,
              note
            }).save();
            const updateBook = await Book.findById(bookId);
            updateBook.notes.push(newNote.id);
            updateBook.save();
          }
        });
      }
    });
    return res.status(201).json({ status: "SUCCESS", message: "Data Saved Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "FAILED", message: "Internal Server Error" });
  }
});

router.get('/books', async (req, res) => {
  const userId = req.query.userId;

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

    // for (const nodeId of noteIds) {
    //   const note = await Note.findById(nodeId);
    //   newObj["notes"].push(note.note);
    // }
    booksList.push(newObj);
  }
  return res.status(200).json({ books: booksList});
});

module.exports = router;
