import { useState, useEffect } from 'react'
import axios from 'axios'
import { FileText, Search, Download, Eye } from 'lucide-react'
import { format } from 'date-fns'

export default function Invoices() {
  const [invoices, setInvoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchInvoices()
  }, [])

  const fetchInvoices = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('/api/invoices', {
        headers: { Authorization: `Bearer ${token}` }
      })
      setInvoices(res.data)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      unpaid: 'badge-danger',
      partial: 'badge-warning',
      paid: 'badge-success'
    }
    return badges[status] || 'badge-default'
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
          <p className="text-gray-600 mt-1">Manage billing and invoices</p>
        </div>
      </div>

      <div className="card-modern">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search invoices..."
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
                <th>Invoice #</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Paid</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    <FileText size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No invoices found</p>
                  </td>
                </tr>
              ) : (
                invoices.map(invoice => (
                  <tr key={invoice._id}>
                    <td className="font-mono text-sm">{invoice.invoiceNumber}</td>
                    <td>{invoice.user?.storeName || invoice.user?.name || 'Unknown'}</td>
                    <td className="font-semibold">Rs. {invoice.totalAmount}</td>
                    <td>Rs. {invoice.paidAmount}</td>
                    <td>
                      <span className={`badge ${getStatusBadge(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td>{format(new Date(invoice.createdAt), 'MMM dd, yyyy')}</td>
                    <td>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <Eye size={16} />
                        </button>
                        <button className="p-2 hover:bg-blue-100 rounded text-blue-600">
                          <Download size={16} />
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
