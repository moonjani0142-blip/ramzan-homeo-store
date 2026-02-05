import { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import {
  DollarSign, ShoppingCart, Package, Store, TrendingUp, TrendingDown,
  AlertCircle, Search, ArrowRight, Calendar, Users
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import axios from 'axios'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeOrders: 0,
    totalProducts: 0,
    registeredStores: 0,
    lowStockItems: 0,
    revenueGrowth: 0
  })
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  // Sample weekly revenue data
  const revenueData = [
    { day: 'Mon', revenue: 12500 },
    { day: 'Tue', revenue: 18900 },
    { day: 'Wed', revenue: 15200 },
    { day: 'Thu', revenue: 22100 },
    { day: 'Fri', revenue: 28400 },
    { day: 'Sat', revenue: 25600 },
    { day: 'Sun', revenue: 19300 },
  ]

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/dashboard/stats')
      setStats(res.data)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Set default demo data
      setStats({
        totalRevenue: 45231.89,
        activeOrders: 1,
        totalProducts: 5,
        registeredStores: 12,
        lowStockItems: 0,
        revenueGrowth: 20.1
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = async (query) => {
    setSearchQuery(query)
    if (query.length < 2) {
      setSearchResults([])
      return
    }

    try {
      const res = await axios.get(`/api/products/search?q=${query}`)
      setSearchResults(res.data.products || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    }
  }

  const statCards = [
    {
      title: 'Total Revenue',
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      change: `+${stats.revenueGrowth}% from last month`,
      icon: DollarSign,
      color: 'from-primary-500 to-primary-600',
      textColor: 'text-primary-600',
      bgColor: 'bg-primary-50',
      trend: 'up'
    },
    {
      title: 'Active Orders',
      value: stats.activeOrders,
      change: `${stats.activeOrders} total orders`,
      icon: ShoppingCart,
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      trend: 'neutral'
    },
    {
      title: 'Products',
      value: stats.totalProducts,
      change: `${stats.lowStockItems} low stock items`,
      icon: Package,
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      trend: 'neutral'
    },
    {
      title: 'Registered Stores',
      value: stats.registeredStores,
      change: '+2 new this week',
      icon: Store,
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      color: 'from-green-500 to-green-600',
      trend: 'up'
    },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Dashboard Overview
          </h1>
          <p className="text-gray-600">
            Welcome back, {user?.name}. Here's what's happening today.
          </p>
        </div>
        <div className="flex items-center space-x-3 text-gray-600">
          <Calendar className="w-5 h-5" />
          <span className="font-medium">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div
              key={index}
              className="card-modern p-6 relative overflow-hidden group hover:shadow-card-hover transition-all duration-300 stagger-item"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-300`}></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${card.bgColor} p-3 rounded-xl`}>
                    <Icon className={`w-6 h-6 ${card.textColor}`} />
                  </div>
                  {card.trend === 'up' && (
                    <TrendingUp className="w-5 h-5 text-green-500" />
                  )}
                  {card.trend === 'down' && (
                    <TrendingDown className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <h3 className="text-gray-600 text-sm font-medium mb-1">
                  {card.title}
                </h3>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {card.value}
                </p>
                <p className="text-sm text-gray-500">
                  {card.change}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Search Medicine Card */}
      <div className="card-modern p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Search Medicine
            </h2>
            <p className="text-sm text-gray-600">
              Find medicine information instantly
            </p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center">
            <Search className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by medicine name, batch number, or company..."
            className="input-modern pl-12"
          />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
            {searchResults.map((product, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 text-sm">
                      <div>
                        <span className="text-gray-500">Batch:</span>{' '}
                        <span className="font-medium">{product.batchNo}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Packing:</span>{' '}
                        <span className="font-medium">{product.packing}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Rate:</span>{' '}
                        <span className="font-medium text-primary-600">Rs. {product.rate}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Stock:</span>{' '}
                        <span className={`font-medium ${product.quantity < 10 ? 'text-red-600' : 'text-green-600'}`}>
                          {product.quantity} units
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Company: {product.company} | Potency: {product.potency}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Charts and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Chart */}
        <div className="card-modern p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Weekly Revenue
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => `Rs. ${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#17a2b8"
                strokeWidth={3}
                dot={{ fill: '#17a2b8', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Low Stock Alerts */}
        <div className="card-modern p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Low Stock Alerts
            </h2>
            <Link to="/admin/inventory" className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {stats.lowStockItems === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Package className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900 mb-1">
                No alerts. Inventory looks good!
              </p>
              <p className="text-sm text-gray-500">
                All products are well stocked
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Low stock items would be listed here */}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card-modern p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link to="/admin/user-management" className="btn-primary text-center">
            <Users className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Create Store</span>
          </Link>
          <Link to="/admin/orders" className="btn-secondary text-center">
            <ShoppingCart className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">New Order</span>
          </Link>
          <Link to="/admin/products" className="btn-secondary text-center">
            <Package className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Add Product</span>
          </Link>
          <Link to="/admin/invoices" className="btn-secondary text-center">
            <DollarSign className="w-5 h-5 mx-auto mb-1" />
            <span className="text-sm">Generate Invoice</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
