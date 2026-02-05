import { useState, useEffect } from 'react'
import axios from 'axios'
import { DollarSign, TrendingUp, TrendingDown, Calendar } from 'lucide-react'

export default function CashFlow() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    pendingPayments: 0,
    paidInvoices: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/dashboard/stats', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data.stats || {})
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
        <h1 className="text-3xl font-bold text-gray-900">Cash Flow</h1>
        <p className="text-gray-600 mt-1">Track revenue and payments</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold text-green-600">Rs. {stats.totalRevenue || 0}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <TrendingUp className="text-green-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Pending Payments</p>
              <p className="text-3xl font-bold text-yellow-600">Rs. {stats.pendingPayments || 0}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <DollarSign className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>

        <div className="card-modern p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Paid Invoices</p>
              <p className="text-3xl font-bold text-blue-600">{stats.totalInvoices || 0}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Calendar className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="card-modern p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="text-center py-8 text-gray-500">
          <DollarSign size={48} className="mx-auto mb-2 opacity-50" />
          <p>No transactions to display</p>
          <p className="text-sm">Connect to database to see transaction history</p>
        </div>
      </div>
    </div>
  )
}
