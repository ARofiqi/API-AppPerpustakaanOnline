const express = require("express");
const cors = require("cors");

const booksRoutes = require("./routes/booksRoutes");
const borrowedBooksRoutes = require("./routes/borrowedBooksRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", booksRoutes);
app.use("/api/borrowedBooks", borrowedBooksRoutes);

app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
