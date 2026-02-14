/**
 * Homepage - Halaman Navigasi Utama
 * 
 * Halaman ini menyediakan navigasi ke 3 halaman katalog produk
 * dengan metode rendering berbeda
 */

import Link from 'next/link';

export default function Home() {
  const renderingMethods = [
    {
      title: 'Client Side Rendering (CSR)',
      path: '/csr',
      color: 'bg-blue-500 hover:bg-blue-600',
      icon: '🖥️',
      description: 'Rendering terjadi di browser setelah halaman dimuat'
    },
    {
      title: 'Server Side Rendering (SSR)',
      path: '/ssr',
      color: 'bg-green-500 hover:bg-green-600',
      icon: '⚡',
      description: 'Rendering terjadi di server setiap kali ada request'
    },
    {
      title: 'Static Site Generation (SSG)',
      path: '/ssg',
      color: 'bg-purple-500 hover:bg-purple-600',
      icon: '📄',
      description: 'Halaman di-generate saat build time'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🛍️ Katalog Produk
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-2">
            Demo Rendering Methods di Next.js
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Aplikasi ini mendemonstrasikan perbedaan antara CSR, SSR, dan SSG 
            menggunakan Next.js App Router dengan studi kasus katalog produk yang sama.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {renderingMethods.map((method) => (
            <Link 
              key={method.path}
              href={method.path}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 h-full border-2 border-transparent group-hover:border-gray-300">
                <div className="text-center">
                  <div className="text-6xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-6">
                    {method.description}
                  </p>
                  <div className={`${method.color} text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block`}>
                    Lihat Demo →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Info Section */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📚 Penjelasan Singkat
          </h3>
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-blue-600">Client Side Rendering (CSR)</h4>
              <p className="text-sm">
                HTML awal kosong, JavaScript di browser mengambil data dari API lalu me-render konten.
                Cocok untuk aplikasi interaktif yang tidak butuh SEO.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-green-600">Server Side Rendering (SSR)</h4>
              <p className="text-sm">
                Server me-render HTML lengkap dengan data untuk setiap request.
                Cocok untuk konten dinamis yang butuh SEO dan data realtime.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-purple-600">Static Site Generation (SSG)</h4>
              <p className="text-sm">
                HTML di-generate sekali saat build time dan di-serve sebagai file statis.
                Cocok untuk konten yang jarang berubah dengan performa maksimal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}