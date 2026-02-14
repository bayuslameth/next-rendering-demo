# 🛍️ Demo Rendering Methods - Next.js App Router

Aplikasi demonstrasi perbedaan antara **Client Side Rendering (CSR)**, **Server Side Rendering (SSR)**, dan **Static Site Generation (SSG)** menggunakan Next.js dengan studi kasus katalog produk.

## 📚 Tujuan Pembelajaran

Aplikasi ini dibuat untuk memahami perbedaan teknis dan konseptual dari tiga metode rendering utama dalam Next.js:

1. **CSR** - Rendering di browser setelah halaman dimuat
2. **SSR** - Rendering di server setiap kali ada request
3. **SSG** - Rendering di server saat build time

## 🚀 Cara Menjalankan

### 1. Instalasi Dependencies

```bash
npm install
```

### 2. Jalankan Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### 3. Build untuk Production

```bash
npm run build
npm start
```

## 📁 Struktur Folder

```
katalog-produk-rendering/
├── src/
│   ├── app/
│   │   ├── page.js                 # Homepage dengan navigasi
│   │   ├── layout.js               # Root layout
│   │   ├── csr/
│   │   │   └── page.js             # Client Side Rendering
│   │   ├── ssr/
│   │   │   └── page.js             # Server Side Rendering
│   │   ├── ssg/
│   │   │   └── page.js             # Static Site Generation
│   │   └── api/
│   │       └── products/
│   │           └── route.js        # API endpoint
│   ├── components/
│   │   └── ProductList.js          # Komponen daftar produk
│   └── data/
│       └── products.json           # Dummy data produk
├── package.json
└── README.md
```

## 🎯 Fitur-Fitur Aplikasi

### ✅ Client Side Rendering (CSR) - `/csr`

- Menggunakan `"use client"` directive
- Data di-fetch dengan `useEffect` + `fetch` API
- HTML awal kosong (tanpa data produk)
- Loading state terlihat oleh user
- Komponen di-lazy load dengan `next/dynamic`

**Alur:**
1. Server kirim HTML kosong
2. Browser download JavaScript
3. `useEffect` fetch data dari API
4. Component re-render dengan data

### ✅ Server Side Rendering (SSR) - `/ssr`

- Menggunakan async Server Component
- Data di-fetch dengan `fetch()` + `cache: 'no-store'`
- HTML sudah berisi data produk
- Tidak ada loading state
- Data fresh setiap request

**Alur:**
1. User request halaman
2. Server fetch data dari API
3. Server render HTML lengkap
4. HTML dikirim ke browser

### ✅ Static Site Generation (SSG) - `/ssg`

- Menggunakan `export const dynamic = 'force-static'`
- Data diambil langsung dari JSON file
- HTML di-generate saat build time
- Performa sangat cepat
- Data statis sampai rebuild

**Alur:**
1. Saat `npm run build`, data diambil
2. HTML statis di-generate
3. Setiap request serve file statis

## 🔍 Perbedaan Utama

| Aspek | CSR | SSR | SSG |
|-------|-----|-----|-----|
| **Rendering Location** | Browser | Server (setiap request) | Server (saat build) |
| **Data Fetching** | Setelah load | Saat request | Saat build |
| **HTML Awal** | Kosong | Lengkap dengan data | Lengkap dengan data |
| **Loading State** | Ya | Tidak | Tidak |
| **SEO** | Kurang optimal | Optimal | Optimal |
| **Performa** | Baik | Sedang | Sangat baik |
| **Data Freshness** | Real-time | Real-time | Statis |
| **Server Load** | Rendah | Tinggi | Minimal |

## 🧪 Cara Testing

### Test CSR
1. Buka `/csr`
2. Perhatikan loading state muncul
3. Buka "View Page Source" → HTML tidak berisi data produk
4. Buka DevTools Network → lihat request ke `/api/products`

### Test SSR
1. Buka `/ssr`
2. Tidak ada loading state
3. Buka "View Page Source" → HTML sudah berisi data produk
4. Refresh halaman → timestamp berubah (server render ulang)

### Test SSG
1. Build aplikasi: `npm run build`
2. Buka `/ssg`
3. Tidak ada loading state
4. Buka "View Page Source" → HTML sudah berisi data produk
5. Refresh halaman → timestamp TIDAK berubah (statis)

## 💡 Kapan Menggunakan?

### Gunakan CSR untuk:
- Dashboard admin (tidak butuh SEO)
- Aplikasi dengan banyak interaksi user
- Data yang sangat personal dan dinamis
- Single Page Application (SPA)

### Gunakan SSR untuk:
- Halaman produk e-commerce
- Berita dan artikel yang sering update
- Konten yang dipersonalisasi
- Halaman yang butuh SEO + data real-time

### Gunakan SSG untuk:
- Blog dan dokumentasi
- Landing page marketing
- Halaman company profile
- Konten yang jarang berubah
- Website yang butuh performa maksimal

## 🛠️ Teknologi yang Digunakan

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS** (styling)
- **npm** (package manager)

## 📝 Catatan Penting

1. **SSR menggunakan `cache: 'no-store'`** untuk memastikan data selalu fresh
2. **SSG menggunakan `export const dynamic = 'force-static'`** untuk force static generation
3. **Lazy loading** diimplementasikan dengan `next/dynamic` di semua halaman
4. **API route** di `/api/products` menyediakan data untuk CSR dan SSR

## 🎓 Untuk Presentasi

Demonstrasi dapat dilakukan dengan:

1. **Live Demo**: Jalankan aplikasi dan navigasi antar halaman
2. **View Page Source**: Tunjukkan perbedaan HTML awal
3. **DevTools Network**: Tunjukkan kapan data di-fetch
4. **Build Output**: Tunjukkan hasil `npm run build`

## 📧 Kontributor

Aplikasi ini dibuat untuk keperluan tugas perkuliahan dan presentasi.

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan edukasi.