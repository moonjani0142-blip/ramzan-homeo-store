import { useState, useEffect } from 'react'
import axios from 'axios'
import { Package, Search, ShoppingCart, Plus } from 'lucide-react'

export default function BrowseProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/products', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setProducts(res.data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Browse Products</h1>
        <p className="text-gray-600 mt-1">Find homeopathic medicines</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-modern pl-10 w-full"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <Package size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400 text-sm">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <div key={product._id} className="card-modern overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-gray-500 text-sm">{product.category}</p>
                  </div>
                  {product.potency && (
                    <span className="badge badge-primary">{product.potency}</span>
                  )}
                </div>
                
                <p className="text-gray-600 text-sm mb-4">{product.description || 'No description available'}</p>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold text-primary-600">Rs. {product.price}</p>
                    <p className={`text-sm ${product.quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                    </p>
                  </div>
                  <button 
                    disabled={product.quantity === 0}
                    className={`btn-primary flex items-center gap-2 ${product.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Plus size={16} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
