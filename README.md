# Coding Test v1

Aplikasi dashboard berbasis web yang dikembangkan menggunakan Next.js dan TypeScript untuk menampilkan serta mengelola tampilan data produk dan pengguna melalui REST API DummyJSON. Proyek ini dibuat sebagai bagian dari coding test untuk posisi **Front-End Engineer**, dengan fokus pada reusable components, pemisahan logic dan UI, validasi data, serta pengalaman pengguna yang responsif.

## ✨ Features

### 1. Login & Session Management
- Halaman login dengan validasi email dan password.
- Simulasi autentikasi menggunakan akun demo tanpa backend.
- Penyimpanan sesi menggunakan `localStorage`.
- Proteksi halaman aplikasi untuk pengguna yang belum login.
- Fitur logout untuk mengakhiri sesi.

### 2. Product Catalog
- Mengambil data produk dari DummyJSON API.
- Menampilkan produk dalam bentuk card.
- Pencarian produk berdasarkan kata kunci.
- Filter berdasarkan kategori produk.
- Pagination dengan 12 produk per halaman.
- Menampilkan gambar, nama, kategori, deskripsi, harga, diskon, rating, dan status stok.
- Menghitung harga setelah diskon.

### 3. User Management
- Mengambil data pengguna dari DummyJSON API.
- Menampilkan informasi pengguna dalam tabel.
- Pencarian pengguna berdasarkan kata kunci.
- Pagination dengan 12 pengguna per halaman.
- Menampilkan nama, email, telepon, perusahaan, jabatan, dan usia.
- Menampilkan inisial sebagai fallback jika foto pengguna tidak tersedia.

### 4. User Experience & Error Handling
- Loading indicator ketika data sedang dimuat.
- Tampilan error dan tombol untuk mencoba kembali.
- Empty state ketika data tidak ditemukan.
- Validasi dan normalisasi data API sebelum ditampilkan.
- Pembatalan request yang sudah tidak diperlukan.
- Debounced search untuk mengurangi request berulang ketika pengguna mengetik.
- Layout responsif dengan Tailwind CSS.
- Komponen UI yang dapat digunakan kembali.

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Next.js | Framework React dan routing |
| React.js | Pembangunan antarmuka pengguna |
| TypeScript | Static typing dan type safety |
| Tailwind CSS | Styling dan responsive layout |
| Fetch API | Integrasi REST API |
| DummyJSON | Sumber data produk, pengguna, dan kategori |
| Lucide React | Ikon antarmuka |
| Git & GitHub | Version control dan repository |

## 🚀 Getting Started

### Prerequisites

Pastikan perangkat kamu sudah memiliki:
- Node.js versi LTS yang kompatibel dengan versi Next.js pada proyek.
- npm.
- Git.

### Installation

1. Clone repository:

   ```bash
   git clone https://github.com/USERNAME/REPOSITORY-NAME.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd REPOSITORY-NAME
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Jalankan development server:

   ```bash
   npm run dev
   ```

5. Buka aplikasi di browser:

   ```text
   http://localhost:3000
   ```

Ganti `USERNAME` dan `REPOSITORY-NAME` dengan nama akun serta repository GitHub yang sebenarnya.

## 🔐 Demo Login

Gunakan akun demo berikut untuk masuk ke aplikasi:

| Field | Value |
|---|---|
| Email | `imam@gmail.com` |
| Password | `imam123` |

**Note:** Login hanya digunakan untuk simulasi. Kredensial diperiksa di sisi client dan sesi disimpan dalam `localStorage`. Implementasi ini bukan autentikasi yang aman untuk aplikasi produksi.

## 🌐 API Integration

Aplikasi menggunakan [DummyJSON](https://dummyjson.com/docs) sebagai sumber data eksternal.

| Feature | Endpoint | Description |
|---|---|---|
| Product List | `GET /products` | Mengambil daftar produk |
| Product Search | `GET /products/search?q={query}` | Mencari produk |
| Product Categories | `GET /products/category-list` | Mengambil daftar kategori |
| Products by Category | `GET /products/category/{category}` | Memfilter produk berdasarkan kategori |
| User List | `GET /users` | Mengambil daftar pengguna |
| User Search | `GET /users/search?q={query}` | Mencari pengguna |

Base URL:

```text
https://dummyjson.com
```

Seluruh request API ditangani melalui `src/services/api.ts` menggunakan Fetch API. Respons API kemudian diproses melalui fungsi normalisasi sebelum digunakan oleh komponen antarmuka.

## 📁 Project Structure

```text
src/
├── app/
│   ├── page.tsx
│   ├── providers.tsx
│   ├── login/
│   │   └── page.tsx
│   └── (app)/
│       ├── layout.tsx
│       ├── products/
│       │   └── page.tsx
│       └── users/
│           └── page.tsx
├── components/
│   ├── Button.tsx
│   ├── Layout.tsx
│   ├── Pagination.tsx
│   ├── ProductCard.tsx
│   ├── SearchInput.tsx
│   ├── StatusView.tsx
│   ├── TextField.tsx
│   ├── UserTable.tsx
│   └── ui.ts
├── context/
│   └── AuthContext.tsx
├── hooks/
│   ├── useDebounce.ts
│   └── useFetch.ts
├── services/
│   └── api.ts
├── types/
│   └── index.ts
└── utils/
    └── processors.ts
```

### Architecture Overview

- **`app/`** — Mengatur halaman, routing, dan proteksi halaman aplikasi.
- **`components/`** — Berisi reusable UI components seperti tombol, input, kartu produk, tabel pengguna, pagination, dan status tampilan.
- **`context/`** — Mengelola autentikasi demo melalui React Context.
- **`hooks/`** — Menyediakan custom hooks untuk fetching data dan debounced search.
- **`services/`** — Memisahkan request API dari komponen UI.
- **`types/`** — Mendefinisikan interface TypeScript untuk produk, pengguna, dan respons API.
- **`utils/`** — Menyediakan fungsi validasi, normalisasi data, pemformatan harga, serta helper lainnya.

## 🧩 Code Quality & Design Decisions

### Reusable Components

Komponen seperti `Button`, `TextField`, `SearchInput`, `Pagination`, dan `StatusView` digunakan untuk menjaga konsistensi tampilan dan mengurangi duplikasi kode.

### Separation of Concerns

Pengambilan data dipisahkan ke dalam service API, sedangkan validasi, normalisasi, dan transformasi data ditempatkan dalam utility functions. Dengan demikian, komponen halaman dapat berfokus pada tampilan dan interaksi pengguna.

### Loading, Error, and Empty States

`useFetch` mengelola proses request, status loading, error, serta retry. `StatusView` menampilkan kondisi tersebut secara konsisten pada halaman produk dan pengguna.

### Data Validation

Respons API diperlakukan sebagai data yang perlu diperiksa terlebih dahulu. Fungsi normalisasi memvalidasi field penting dan menyediakan nilai fallback untuk beberapa field opsional sebelum data diteruskan ke UI.

### Responsive Interface

Tailwind CSS digunakan untuk membangun layout yang menyesuaikan ukuran layar, termasuk navigasi sidebar, form login, kartu produk, dan tabel pengguna.

## 📚 Additional Libraries

- **`lucide-react`** — Menyediakan ikon untuk navigasi dan elemen antarmuka.
- **Tailwind CSS** — Mempermudah styling dengan utility classes.
- **React Context API** — Mengelola status login secara global tanpa library state management tambahan.

## 📌 Notes

- Proyek ini menggunakan data dari DummyJSON dan tidak membutuhkan backend buatan sendiri.
- Fitur login merupakan simulasi untuk keperluan coding test.
- Data produk dan pengguna berasal dari API eksternal sehingga membutuhkan koneksi internet.
- Fitur yang ditampilkan dalam dokumentasi ini mengacu pada implementasi yang tersedia di repository.

## 👨‍💻 Author

**Imam Ismail Tambili**
