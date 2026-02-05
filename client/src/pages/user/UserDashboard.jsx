import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'
import { ShoppingCart, Package, FileText, Clock } from 'lucide-react'

export default function UserDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalInvoices: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const [ordersRes, invoicesRes] = await Promise.all([
        axios.get('/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('/api/invoices', { headers: { Authorization: `Bearer ${token}` } })
      ])
      
      const orders = ordersRes.data
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        totalInvoices: invoicesRes.data.length
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">{user?.storeName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalOrders}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <ShoppingCart className="text-blue-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Orders</p>
              <p className="text-3xl font-bold text-yellow-600">{stats.pendingOrders}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <Clock className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Invoices</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalInvoices}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FileText className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Browse Products</p>
              <p className="text-lg font-medium text-primary-600">View Catalog</p>
            </div>
            <div className="p-3 bg-primary-100 rounded-full">
              <Package className="text-primary-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="card-modern p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a href="/user/products" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <Package className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium">Browse Products</p>
          </a>
          <a href="/user/cart" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <ShoppingCart className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium">View Cart</p>
          </a>
          <a href="/user/orders" className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center">
            <FileText className="mx-auto mb-2 text-primary-600" size={32} />
            <p className="font-medium">My Orders</p>
          </a>
        </div>
      </div>
    </div>
  )
}
