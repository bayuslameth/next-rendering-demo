/**
 * SERVER SIDE RENDERING (SSR)
 * 
 * ALUR RENDERING:
 * 1. User melakukan request ke halaman /ssr
 * 2. Server menjalankan async function untuk fetch data
 * 3. Server menunggu data selesai di-fetch dari API
 * 4. Server me-render HTML lengkap dengan data produk
 * 5. HTML yang sudah berisi data dikirim ke browser
 * 6. Browser langsung menampilkan konten tanpa loading state
 * 
 * KARAKTERISTIK:
 * - HTML sudah mengandung data (bagus untuk SEO)
 * - Tidak ada loading state di browser
 * - Data fresh setiap request
 * - Server melakukan komputasi setiap request
 * 
 * KAPAN DIGUNAKAN:
 * - Halaman yang butuh SEO
 * - Data yang sering berubah (real-time)
 * - Konten yang dipersonalisasi per user
 * - Halaman yang butuh data terbaru setiap kali diakses
 */

import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy loading component ProductList dengan loading fallback
const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
      <p className="text-gray-600 mt-4">Memuat komponen...</p>
    </div>
  )
});

// Async Server Component untuk SSR
export default async function SSRPage() {
  // Fetch data di server dengan cache disabled
  // cache: 'no-store' memastikan data selalu fresh setiap request
  const response = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store' // Penting! Ini yang membuat SSR (bukan SSG)
  });

  const result = await response.json();
  const products = result.data;
  const timestamp = new Date().toLocaleString('id-ID');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-green-600 hover:text-green-800 mb-6"
        >
          ← Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="bg-green-500 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            ⚡ Katalog Produk - Server Side Rendering
          </h1>
          <p className="text-green-100">Metode: SSR</p>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📖 Penjelasan Server Side Rendering (SSR)
          </h2>
          
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Teknik Rendering:</strong> Server Side Rendering
            </p>
            <p>
              <strong>Di mana proses rendering terjadi?</strong> 
              <br />
              Rendering terjadi di <span className="font-semibold text-green-600">server</span> setiap kali 
              ada request. Server mengambil data, me-render HTML lengkap, lalu mengirimnya ke browser.
            </p>
            <p>
              <strong>Kapan data diambil?</strong>
              <br />
              Data diambil <span className="font-semibold text-green-600">saat ada request ke halaman ini</span>.
              Setiap kali halaman di-refresh, server akan fetch data terbaru dan render ulang HTML.
            </p>
            <p>
              <strong>Keuntungan:</strong> SEO optimal, data selalu fresh, tidak ada loading state
            </p>
            <p>
              <strong>Kekurangan:</strong> Server load lebih tinggi, TTFB (Time To First Byte) lebih lama
            </p>
          </div>

          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded">
            <p className="text-sm text-gray-700">
              <strong>⏰ Halaman ini di-render di server pada:</strong> {timestamp}
              <br />
              <span className="text-xs text-gray-600">
                (Refresh halaman untuk melihat timestamp baru)
              </span>
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ProductList products={products} renderMethod="Server Side Rendering (SSR)" />
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">🔧 Informasi Teknis</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Menggunakan <code className="bg-white px-2 py-0.5 rounded">async</code> Server Component</li>
            <li>• Data di-fetch dengan <code className="bg-white px-2 py-0.5 rounded">fetch()</code> + <code className="bg-white px-2 py-0.5 rounded"></code></li>
            <li>• Component ProductList di-lazy load dengan <code className="bg-white px-2 py-0.5 rounded">next/dynamic</code></li>
            <li>• HTML sudah berisi data produk (cek View Page Source)</li>
            <li>• Setiap refresh = request baru ke server</li>
          </ul>
        </div>

        {/* SEO Info */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">🔍 Keunggulan untuk SEO</h3>
          <p className="text-sm text-gray-700">
            Halaman ini sangat baik untuk SEO karena HTML yang dikirim ke browser 
            sudah mengandung seluruh data produk. Search engine crawler dapat langsung 
            membaca konten tanpa perlu menjalankan JavaScript.
          </p>
        </div>
      </div>
    </div>
  );
}