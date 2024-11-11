const express = require("express");
const router = express.Router();
const books = require("../data.json");

router.get("/", (req, res) => {
  res.json(books);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id));
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.post("/", (req, res) => {
  const { title, author, genre, year, image, summary } = req.body;
  if (!title || !author || !genre || !year || !image || !summary) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    year,
    image,
    summary,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, genre, year, image, summary } = req.body;

  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    books[index] = {
      id: parseInt(id),
      title: title || books[index].title,
      author: author || books[index].author,
      genre: genre || books[index].genre,
      year: year || books[index].year,
      image: image || books[index].image,
      summary: summary || books[index].summary,
    };
    res.json(books[index]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((book) => book.id === parseInt(id));
  if (index !== -1) {
    const deletedBook = books.splice(index, 1);
    res.json(deletedBook[0]);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = router;
