/**
 * Komponen ProductList
 * Menampilkan daftar produk dalam bentuk grid card
 * Komponen ini akan di-lazy load di beberapa halaman
 */

export default function ProductList({ products, renderMethod }) {
  // Format harga ke format Rupiah
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mt-8">
      <p className="text-sm text-gray-600 mb-4">
        📊 Metode Rendering: <span className="font-semibold text-blue-600">{renderMethod}</span>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="border border-gray-200 rounded-lg p-5 hover:shadow-lg transition-shadow bg-white"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {product.category}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{product.description}</p>
            
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-green-600">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-gray-500">
                Stok: {product.stock}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}