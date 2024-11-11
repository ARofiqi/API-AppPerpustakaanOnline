const express = require("express");
const router = express.Router();
const books = require("../data");

let borrowedBooks = [
  {
    id: 1,
    title: "Laskar Pelangi",
    author: "Andrea Hirata",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1489732961i/1362193.jpg",
    borrowedAt: "2024-11-01", // Example: date when the book was borrowed
    borrowedDays: 7, // Example: number of days the book is borrowed
    userNIM: "12345678", // Example: user NIM who borrowed the book
  },
  {
    id: 2,
    title: "Bumi Manusia",
    author: "Pramoedya Ananta Toer",
    image: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1565658920i/1398034.jpg",
    borrowedAt: "2024-11-02", // Example: date when the book was borrowed
    borrowedDays: 7, // Example: number of days the book is borrowed
    userNIM: "87654321", // Example: user NIM who borrowed the book
  },
];

router.get("/", (req, res) => {
  res.json(borrowedBooks);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const borrowedBook = borrowedBooks.find((book) => book.id === parseInt(id));
  if (borrowedBook) {
    res.json(borrowedBook);
  } else {
    res.status(404).json({ message: "Borrowed book not found" });
  }
});

router.post("/:id", (req, res) => {
  const { id } = req.params;
  const { borrowedDays, userNIM } = req.body;

  // Validate borrowedDays
  if (!borrowedDays || borrowedDays < 1 || borrowedDays > 14) {
    return res.status(400).json({ message: "Jumlah hari peminjaman harus antara 1 dan 14 hari" });
  }

  // Validate userNIM
  if (!userNIM) {
    return res.status(400).json({ message: "User NIM harus disertakan" });
  }

  // Check if the book is already borrowed
  const existingBorrowedBook = borrowedBooks.find((book) => book.id === parseInt(id));
  if (existingBorrowedBook) {
    return res.status(400).json({ message: "Buku ini sudah dipinjam" });
  }

  // Find the book from the books collection
  const borrowedBook = books.find((book) => book.id === parseInt(id));

  if (borrowedBook) {
    // Calculate borrowedAt and returnDate
    const borrowDate = new Date();
    const borrowedAt = borrowDate.toISOString().split("T")[0];
    const returnDate = new Date(borrowDate);
    returnDate.setDate(borrowDate.getDate() + borrowedDays);

    const newBorrowedBook = {
      id: borrowedBook.id,
      title: borrowedBook.title,
      author: borrowedBook.author,
      image: borrowedBook.image,
      borrowedAt,
      borrowedDays,
      userNIM,
      returnDate: returnDate.toISOString().split("T")[0],
    };

    // Add the new borrowed book to the list
    borrowedBooks.push(newBorrowedBook);
    console.log(borrowedBooks);

    // Respond with the new borrowed book
    res.status(201).json(newBorrowedBook);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = borrowedBooks.findIndex((book) => book.id === parseInt(id));

  if (index !== -1) {
    const returnedBook = borrowedBooks.splice(index, 1);
    res.json(returnedBook[0]);
  } else {
    res.status(404).json({ message: "Borrowed book not found" });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { additionalDays } = req.body;

  // // Validate additionalDays input
  // if (!additionalDays || additionalDays < 1 || additionalDays > 7) {
  //   return res.status(400).json({ message: "Perpanjangan hanya dapat dilakukan antara 1 dan 7 hari" });
  // }

  // Find the borrowed book by ID
  const borrowedBook = borrowedBooks.find((book) => book.id === parseInt(id));

  console.log(borrowedBook);
  if (borrowedBook) {
    // Update the borrowedDays and calculate the new returnDate
    borrowedBook.borrowedDays += additionalDays;
    const borrowDate = new Date(borrowedBook.borrowedAt);
    const newReturnDate = new Date(borrowDate);
    newReturnDate.setDate(borrowDate.getDate() + borrowedBook.borrowedDays);

    borrowedBook.returnDate = newReturnDate.toISOString().split("T")[0];

    res.json({
      message: "Peminjaman diperpanjang",
      borrowedBook,
    });
  } else {
    res.status(404).json({ message: "Borrowed book not found" });
  }
});

module.exports = router;
