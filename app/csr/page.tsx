/**
 * CLIENT SIDE RENDERING (CSR)
 * 
 * ALUR RENDERING:
 * 1. Server mengirim HTML kosong (tanpa data produk) ke browser
 * 2. Browser mendownload dan menjalankan JavaScript
 * 3. useEffect dipanggil setelah component mount
 * 4. Fetch API dipanggil untuk mengambil data dari /api/products
 * 5. Data diterima dan state diupdate
 * 6. React me-render ulang component dengan data produk
 * 
 * KARAKTERISTIK:
 * - HTML awal tidak mengandung data (buruk untuk SEO)
 * - Loading state terlihat oleh user
 * - Data diambil setelah halaman dimuat
 * - Interaktif dan dinamis
 * 
 * KAPAN DIGUNAKAN:
 * - Dashboard admin yang tidak butuh SEO
 * - Aplikasi yang butuh banyak interaksi user
 * - Data yang sangat dinamis dan personal
 */

'use client'; // Directive wajib untuk Client Component

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';

// Lazy loading component ProductList dengan loading fallback
const ProductList = dynamic(() => import('@/components/ProductList'), {
  loading: () => (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="text-gray-600 mt-4">Memuat komponen...</p>
    </div>
  ),
  ssr: false // Komponen ini tidak di-render di server
});

export default function CSRPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fungsi untuk fetch data produk dari API
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Fetch data dari API route
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Gagal mengambil data produk');
        }
        
        const result = await response.json();
        setProducts(result.data);
      } finally {
        setLoading(false);
      } 
    };

    fetchProducts();
  }, []); // Empty dependency array = hanya dijalankan sekali saat mount

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Kembali ke Beranda
        </Link>

        {/* Header */}
        <div className="bg-blue-500 text-white rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            🖥️ Katalog Produk - Client Side Rendering
          </h1>
          <p className="text-blue-100">Metode: CSR</p>
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            📖 Penjelasan Client Side Rendering (CSR)
          </h2>
          
          <div className="space-y-3 text-gray-700">
            <p>
              <strong>Teknik Rendering:</strong> Client Side Rendering
            </p>
            <p>
              <strong>Di mana proses rendering terjadi?</strong> 
              <br />
              Rendering terjadi di <span className="font-semibold text-blue-600">browser (client)</span> 
              setelah JavaScript didownload dan dieksekusi. Server hanya mengirim HTML kosong tanpa data produk.
            </p>
            <p>
              <strong>Kapan data diambil?</strong>
              <br />
              Data diambil <span className="font-semibold text-blue-600">setelah halaman dimuat</span> 
              menggunakan <code className="bg-gray-100 px-2 py-1 rounded">useEffect</code> dan 
              <code className="bg-gray-100 px-2 py-1 rounded">fetch API</code>. User akan melihat loading state terlebih dahulu.
            </p>
            <p>
              <strong>Keuntungan:</strong> Interaktif, ringan di server, cocok untuk aplikasi dinamis
            </p>
            <p>
              <strong>Kekurangan:</strong> SEO kurang optimal, loading state terlihat, butuh JavaScript
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
              <p className="text-gray-600 mt-4 text-lg">Mengambil data produk...</p>
              <p className="text-gray-500 text-sm mt-2">
                (Data sedang di-fetch dari API di browser)
              </p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600 text-lg">❌ Error: {error}</p>
            </div>
          ) : (
            <ProductList products={products} renderMethod="Client Side Rendering (CSR)" />
          )}
        </div>

        {/* Technical Info */}
        <div className="mt-8 bg-gray-100 rounded-lg p-6">
          <h3 className="font-bold text-gray-800 mb-2">🔧 Informasi Teknis</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• Menggunakan <code className="bg-white px-2 py-0.5 rounded">use client</code> directive</li>
            <li>• Data di-fetch dengan <code className="bg-white px-2 py-0.5 rounded">useEffect</code> hook</li>
            <li>• Component ProductList di-lazy load dengan <code className="bg-white px-2 py-0.5 rounded">next/dynamic</code></li>
            <li>• HTML awal tidak mengandung data produk (cek View Page Source)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}