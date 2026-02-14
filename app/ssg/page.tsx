/**
 * STATIC SITE GENERATION (SSG)
 * 
 * ALUR RENDERING:
 * 1. Saat proses build (npm run build), Next.js menjalankan function ini
 * 2. Data produk diambil dari file JSON
 * 3. HTML statis di-generate dengan data yang sudah ada
 * 4. HTML disimpan sebagai file statis
 * 5. Setiap request hanya serve file HTML statis (sangat cepat)
 * 6. Tidak ada komputasi server atau data fetching saat runtime
 * 
 * KARAKTERISTIK:
 * - HTML di-generate sekali saat build time
 * - Performa sangat cepat (serve static file)
 * - Data tidak berubah sampai build ulang
 * - SEO optimal karena HTML lengkap
 * 
 * KAPAN DIGUNAKAN:
 * - Blog, dokumentasi, landing page
 * - Konten yang jarang berubah
 * - Website yang butuh performa maksimal
 * - Halaman marketing atau company profile
 */

import nextDynamic from 'next/dynamic';
import Link from 'next/link';
import productsData from '@/data/products.json';

// Force static generation
export const dynamic = 'force-static';

// Lazy loading component ProductList dengan loading fallback
const ProductList = nextDynamic(() => import('@/components/ProductList'), {
  loading: () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
      <p className="text-gray-600 mt-4">Memuat komponen...</p>
    </div>
  )
});

// Server Component yang di-static generate
export default function SSGPage() {
  // Data diambil langsung dari file JSON saat build time
  const products = productsData;
  const buildTime = new Date().toLocaleString('id-ID');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 mb-6"
        >
          ← Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="bg-purple-500 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            📄 Katalog Produk - Static Site Generation
          </h1>
          <p className="text-purple-100">Metode: SSG</p>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📖 Penjelasan Static Site Generation (SSG)
          </h2>
          
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Teknik Rendering:</strong> Static Site Generation
            </p>
            <p>
              <strong>Di mana proses rendering terjadi?</strong> 
              <br />
              Rendering terjadi di <span className="font-semibold text-purple-600">server saat proses build</span> 
              (npm run build). Hasilnya adalah file HTML statis yang disimpan dan di-serve tanpa komputasi tambahan.
            </p>
            <p>
              <strong>Kapan data diambil?</strong>
              <br />
              Data diambil <span className="font-semibold text-purple-600">saat build time</span>, 
              bukan saat runtime. Data dibaca langsung dari <code className="bg-gray-100 px-2 py-1 rounded">products.json</code> 
              dan di-embed ke HTML statis.
            </p>
            <p>
              <strong>Keuntungan:</strong> Performa sangat cepat, SEO optimal, server load minimal, CDN-friendly
            </p>
            <p>
              <strong>Kekurangan:</strong> Data statis (tidak realtime), harus rebuild untuk update data
            </p>
          </div>

          <div className="mt-4 p-4 bg-purple-50 border border-purple-200 rounded">
            <p className="text-sm text-gray-700">
              <strong>🏗️ Halaman ini di-build pada:</strong> {buildTime}
              <br />
              <span className="text-xs text-gray-600">
                (Timestamp ini tidak berubah saat refresh karena HTML-nya statis. 
                Hanya berubah saat npm run build dijalankan ulang)
              </span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductList products={products} renderMethod="Static Site Generation (SSG)" />
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">🔧 Informasi Teknis</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Menggunakan <code className="bg-white px-2 py-0.5 rounded"></code></li>
            <li>• Data diambil dengan <code className="bg-white px-2 py-0.5 rounded">import</code> langsung dari JSON</li>
            <li>• Component ProductList di-lazy load dengan <code className="bg-white px-2 py-0.5 rounded">next/dynamic</code></li>
            <li>• HTML di-generate saat <code className="bg-white px-2 py-0.5 rounded">npm run build</code></li>
            <li>• Setiap request hanya serve file statis (tidak ada server computation)</li>
          </ul>
        </div>

        {/* Performance Info */}
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">⚡ Keunggulan Performa</h3>
          <p className="text-sm text-gray-700 mb-3">
            Halaman SSG memiliki performa terbaik karena:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Tidak ada database query saat runtime</li>
            <li>Tidak ada API call saat user mengakses</li>
            <li>File HTML sudah siap di-serve langsung</li>
            <li>Bisa di-cache di CDN untuk performa global</li>
            <li>Time To First Byte (TTFB) sangat cepat</li>
          </ul>
        </div>

        {/* Use Case Info */}
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">💡 Kapan Menggunakan SSG?</h3>
          <p className="text-sm text-gray-700 mb-2">
            SSG cocok untuk:
          </p>
          <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
            <li>Blog posts dan artikel</li>
            <li>Dokumentasi teknis</li>
            <li>Landing page marketing</li>
            <li>Katalog produk yang jarang berubah</li>
            <li>Company profile website</li>
          </ul>
          <p className="text-sm text-gray-600 mt-3">
            ⚠️ Tidak cocok untuk data yang sering berubah atau konten yang dipersonalisasi per user.
          </p>
        </div>
      </div>
    </div>
  );
}