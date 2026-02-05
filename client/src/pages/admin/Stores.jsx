import { useState, useEffect } from 'react'
import axios from 'axios'
import { Store, Search, Plus, Edit, ToggleLeft, ToggleRight } from 'lucide-react'

export default function Stores() {
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchStores()
  }, [])

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/stores', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStores(res.data)
    } catch (error) {
      console.error('Error fetching stores:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredStores = stores.filter(store =>
    store.storeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    store.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Stores</h1>
          <p className="text-gray-600 mt-1">Manage registered stores</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Store
        </button>
      </div>

      <div className="card-modern">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search stores..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-modern pl-10"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table-modern">
            <thead>
              <tr>
                <th>Store Name</th>
                <th>Owner</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStores.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    <Store size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No stores found</p>
                  </td>
                </tr>
              ) : (
                filteredStores.map(store => (
                  <tr key={store._id}>
                    <td className="font-medium">{store.storeName || '-'}</td>
                    <td>{store.name}</td>
                    <td>{store.email}</td>
                    <td>{store.phone || '-'}</td>
                    <td>
                      <span className={`badge ${store.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {store.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Edit size={16} />
                        </button>
                        <button className={`p-2 rounded ${store.isActive ? 'hover:bg-red-100 text-red-600' : 'hover:bg-green-100 text-green-600'}`}>
                          {store.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
