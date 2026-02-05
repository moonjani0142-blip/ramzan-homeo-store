import { useState, useEffect } from 'react'
import axios from 'axios'
import { Beaker, Plus, Search, Edit, Trash2 } from 'lucide-react'

export default function PotencyRange() {
  const [potencies, setPotencies] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPotencies()
  }, [])

  const fetchPotencies = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/potencies', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPotencies(res.data)
    } catch (error) {
      console.error('Error fetching potencies:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPotencies = potencies.filter(potency =>
    potency.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Potency Range</h1>
          <p className="text-gray-600 mt-1">Manage homeopathic potencies</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={20} />
          Add Potency
        </button>
      </div>

      <div className="card-modern">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search potencies..."
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
                <th>Potency Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPotencies.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">
                    <Beaker size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No potencies found</p>
                  </td>
                </tr>
              ) : (
                filteredPotencies.map(potency => (
                  <tr key={potency._id}>
                    <td className="font-medium">{potency.name}</td>
                    <td>{potency.description || '-'}</td>
                    <td>
                      <span className={`badge ${potency.isActive ? 'badge-success' : 'badge-danger'}`}>
                        {potency.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Edit size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-100 rounded text-red-600">
                          <Trash2 size={16} />
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
