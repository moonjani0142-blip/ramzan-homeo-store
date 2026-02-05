import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import User from '../models/User.js'
import Product from '../models/Product.js'
import Order from '../models/Order.js'
import Invoice from '../models/Invoice.js'

const router = express.Router()

router.get('/stats', auth, async (req, res) => {
  try {
    const [totalStores, totalProducts, totalOrders, totalInvoices] = await Promise.all([
      User.countDocuments({ role: 'store' }),
      Product.countDocuments(),
      Order.countDocuments(),
      Invoice.countDocuments()
    ])

    const recentOrders = await Order.find()
      .populate('user', 'name storeName')
      .sort({ createdAt: -1 })
      .limit(5)

    const pendingOrders = await Order.countDocuments({ status: 'pending' })
    
    const totalRevenue = await Invoice.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ])

    res.json({
      stats: {
        totalStores,
        totalProducts,
        totalOrders,
        totalInvoices,
        pendingOrders,
        totalRevenue: totalRevenue[0]?.total || 0
      },
      recentOrders
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
