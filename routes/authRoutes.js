const express = require("express");
const router = express.Router();

const users = [{ email: "20220040159", password: "20220040159" }];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email dan password harus diisi" });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(401).json({ message: "Pengguna tidak ditemukan" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Password salah" });
  }

  res.json({ message: "Login berhasil", user });
});

module.exports = router;
