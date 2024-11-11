# Dokumentasi API - Aplikasi Perpustakaan Online

Aplikasi ini menyediakan API untuk mengelola buku, peminjaman buku, dan autentikasi pengguna. API ini dibangun menggunakan Express.js dan menyediakan beberapa endpoint untuk Admin dan User.

## Base URL

```
http://localhost:3000/api
```

---

## Autentikasi

### 1. Login Pengguna

**POST** `/api/auth/login`

Login untuk pengguna dengan memasukkan **email** dan **password**.

**Body Request:**

```json
{
  "email": "20220040159",
  "password": "20220040159"
}
```

**Response:**

- **Success (200):**
```json
{
  "message": "Login berhasil",
  "user": {
    "email": "20220040159",
    "password": "20220040159"
  }
}
```

- **Error (400):**
```json
{
  "message": "Email dan password harus diisi"
}
```

- **Error (401):**
```json
{
  "message": "Pengguna tidak ditemukan"
}
```

---

## Buku

### 2. Menampilkan Semua Buku

**GET** `/api/books`

Mendapatkan daftar semua buku yang tersedia.

**Response:**

- **Success (200):**
```json
[
  {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "genre": "Fiksi",
    "year": 2005,
    "image": "https://link.to.image.jpg",
    "summary": "Ringkasan buku Laskar Pelangi..."
  },
  ...
]
```

### 3. Menampilkan Buku Berdasarkan ID

**GET** `/api/books/:id`

Mendapatkan detail buku berdasarkan ID.

**Response:**

- **Success (200):**
```json
{
  "id": 1,
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "genre": "Fiksi",
  "year": 2005,
  "image": "https://link.to.image.jpg",
  "summary": "Ringkasan buku Laskar Pelangi..."
}
```

- **Error (404):**
```json
{
  "message": "Book not found"
}
```

### 4. Menambahkan Buku Baru

**POST** `/api/books`

Menambahkan buku baru ke dalam perpustakaan.

**Body Request:**

```json
{
  "title": "Bumi Manusia",
  "author": "Pramoedya Ananta Toer",
  "genre": "Fiksi",
  "year": 1980,
  "image": "https://link.to.image.jpg",
  "summary": "Ringkasan buku Bumi Manusia..."
}
```

**Response:**

- **Success (201):**
```json
{
  "id": 2,
  "title": "Bumi Manusia",
  "author": "Pramoedya Ananta Toer",
  "genre": "Fiksi",
  "year": 1980,
  "image": "https://link.to.image.jpg",
  "summary": "Ringkasan buku Bumi Manusia..."
}
```

- **Error (400):**
```json
{
  "message": "All fields are required"
}
```

### 5. Mengubah Data Buku

**PUT** `/api/books/:id`

Mengubah data buku berdasarkan ID.

**Body Request:**

```json
{
  "title": "Bumi Manusia - Revised",
  "author": "Pramoedya Ananta Toer",
  "genre": "Fiksi",
  "year": 1980,
  "image": "https://link.to.updated.image.jpg",
  "summary": "Updated summary for Bumi Manusia."
}
```

**Response:**

- **Success (200):**
```json
{
  "id": 2,
  "title": "Bumi Manusia - Revised",
  "author": "Pramoedya Ananta Toer",
  "genre": "Fiksi",
  "year": 1980,
  "image": "https://link.to.updated.image.jpg",
  "summary": "Updated summary for Bumi Manusia."
}
```

- **Error (404):**
```json
{
  "message": "Book not found"
}
```

### 6. Menghapus Buku

**DELETE** `/api/books/:id`

Menghapus buku berdasarkan ID.

**Response:**

- **Success (200):**
```json
{
  "id": 2,
  "title": "Bumi Manusia",
  "author": "Pramoedya Ananta Toer",
  "genre": "Fiksi",
  "year": 1980,
  "image": "https://link.to.image.jpg",
  "summary": "Ringkasan buku Bumi Manusia..."
}
```

- **Error (404):**
```json
{
  "message": "Book not found"
}
```

---

## Peminjaman Buku

### 7. Menampilkan Buku yang Dipinjam

**GET** `/api/borrowedBooks`

Menampilkan daftar buku yang sedang dipinjam.

**Response:**

- **Success (200):**
```json
[
  {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "image": "https://link.to.image.jpg",
    "borrowedAt": "2024-11-01",
    "borrowedDays": 7,
    "userNIM": "12345678"
  },
  ...
]
```

### 8. Menampilkan Buku yang Dipinjam Berdasarkan ID

**GET** `/api/borrowedBooks/:id`

Mendapatkan detail buku yang dipinjam berdasarkan ID.

**Response:**

- **Success (200):**
```json
{
  "id": 1,
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "image": "https://link.to.image.jpg",
  "borrowedAt": "2024-11-01",
  "borrowedDays": 7,
  "userNIM": "12345678"
}
```

- **Error (404):**
```json
{
  "message": "Borrowed book not found"
}
```

### 9. Meminjam Buku

**POST** `/api/borrowedBooks/:id`

Melakukan peminjaman buku dengan memasukkan **borrowedDays** dan **userNIM**.

**Body Request:**

```json
{
  "borrowedDays": 7,
  "userNIM": "12345678"
}
```

**Response:**

- **Success (201):**
```json
{
  "id": 1,
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "image": "https://link.to.image.jpg",
  "borrowedAt": "2024-11-01",
  "borrowedDays": 7,
  "userNIM": "12345678",
  "returnDate": "2024-11-08"
}
```

- **Error (400):**
```json
{
  "message": "Jumlah hari peminjaman harus antara 1 dan 14 hari"
}
```

### 10. Mengembalikan Buku

**DELETE** `/api/borrowedBooks/:id`

Mengembalikan buku yang telah dipinjam berdasarkan ID.

**Response:**

- **Success (200):**
```json
{
  "id": 1,
  "title": "Laskar Pelangi",
  "author": "Andrea Hirata",
  "image": "https://link.to.image.jpg",
  "borrowedAt": "2024-11-01",
  "borrowedDays": 7,
  "userNIM": "12345678"
}
```

- **Error (404):**
```json
{
  "message": "Borrowed book not found"
}
```

### 11. Memperpanjang Peminjaman Buku

**PUT** `/api/borrowedBooks/:id`

Memperpanjang masa peminjaman buku.

**Body Request:**

```json
{
  "additionalDays": 7
}
```

**Response:**

- **Success (200):**
```json
{
  "message": "Peminjaman diperpanjang",
  "borrowedBook": {
    "id": 1,
    "title": "Laskar Pelangi",
    "author": "Andrea Hirata",
    "image": "https://link.to.image.jpg",
    "borrowedAt": "2024-11-01",
    "borrowedDays": 14,
    "userNIM": "12345678",
    "returnDate": "2024-11-15"
  }
}
```

- **Error (404):**
```json
{
  "message": "Borrowed book not found"
}
```

---

## Kesimpulan

Dokumentasi ini menjelaskan endpoint-endpoint yang tersedia dalam API Aplikasi Perpustakaan Online. Admin dapat menambah, mengubah, dan menghapus data buku, sementara pengguna dapat melakukan pencarian buku, meminjam buku, dan memperpanjang peminjaman. Pastikan untuk menggunakan autentikasi yang tepat saat mengakses endpoint yang memerlukan login.

