# Katalog – Front-End Coding Test

Aplikasi web sederhana dengan halaman login dan dua fitur yang memakai data dari [DummyJSON](https://dummyjson.com/docs):

- **Produk**: daftar produk, pencarian, filter kategori, pagination.
- **Pengguna**: tabel pengguna, pencarian, pagination.

## Cara menjalankan

Prasyarat: Node.js 18+.

```bash
npm install
npm run dev       # buka http://localhost:3000
npm run build     # build production (sekaligus type-check)
npm start         # jalankan hasil build
```

**Akun demo** (login disimulasikan di sisi client, tanpa backend):

| Email | Password |
|---|---|
| `admin@example.com` | `admin123` |

## Teknologi

- Next.js 14 (App Router) + React 18 + TypeScript
- Fetch API untuk integrasi REST
- Tailwind CSS 3 (warna lewat CSS variable di `tailwind.config.ts`, mendukung dark mode otomatis)
- Git untuk version control

**Library tambahan**: `tailwindcss`, `postcss`, dan `autoprefixer` (dev dependency untuk styling). Routing memakai App Router bawaan Next.js; halaman yang butuh login dilindungi oleh `src/app/(app)/layout.tsx` (redirect ke `/login` jika belum masuk).

## Struktur proyek

```
src/
├── app/
│   ├── layout.tsx, providers.tsx, globals.css (directive Tailwind + variable warna)
│   ├── page.tsx            Redirect ke /products
│   ├── login/page.tsx      Halaman login
│   └── (app)/              Grup route yang dilindungi login
│       ├── layout.tsx      Guard sesi + layout (navbar)
│       ├── products/page.tsx
│       └── users/page.tsx
├── components/   Komponen UI reusable (Button, TextField, StatusView, Pagination, ProductCard, UserTable, ...)
├── hooks/        useFetch (loading/error/retry + abort), useDebounce
├── services/     api.ts – semua pemanggilan DummyJSON
├── utils/        processors.ts – validasi, normalisasi, dan format data (tanpa UI)
├── context/      AuthContext – sesi login
└── types/        Tipe TypeScript
```

## Keputusan teknis

- **Pemisahan logika & UI**: normalisasi/validasi data respons, format harga, hitung diskon, dan validasi form login ada di `utils/processors.ts`. Komponen hanya menampilkan.
- **Reusable component**: `StatusView` membungkus state loading, error (dengan tombol "Coba lagi"), dan data kosong, dipakai di semua halaman.
- **Invalid data**: item respons API yang tidak punya field penting (mis. `id`, `title`, `price`) dibuang; field opsional diberi nilai default.
- **Race condition**: `useFetch` membatalkan request lama dengan `AbortController`; pencarian di-debounce 400 ms.
- **Login**: validasi format email dan panjang password, lalu dicocokkan dengan akun dummy lokal. Sesi disimpan di `localStorage` dan dibaca setelah mount agar tidak terjadi hydration mismatch pada SSR.
- **Pencarian vs kategori**: API DummyJSON tidak mendukung keduanya sekaligus, jadi saat ada kata kunci filter kategori dinonaktifkan.
- **Client components**: data diambil di browser lewat hook `useFetch` (halaman memakai `"use client"`) karena ada interaksi pencarian, filter, dan pagination. Gambar memakai `<img>` biasa agar tidak perlu konfigurasi domain `next/image`.
