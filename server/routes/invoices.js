import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import Invoice from '../models/Invoice.js'
import Order from '../models/Order.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id }
    const invoices = await Invoice.find(query)
      .populate('user', 'name storeName')
      .populate('order')
      .sort({ createdAt: -1 })
    res.json(invoices)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate('user', 'name storeName email address phone')
      .populate({
        path: 'order',
        populate: { path: 'items.product', select: 'name price' }
      })
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', auth, roleCheck('admin'), async (req, res) => {
  try {
    const order = await Order.findById(req.body.orderId)
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }

    const invoiceNumber = `INV-${Date.now()}`
    const invoice = new Invoice({
      order: order._id,
      user: order.user,
      invoiceNumber,
      totalAmount: order.totalAmount
    })
    await invoice.save()
    res.status(201).json(invoice)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id/payment', auth, roleCheck('admin'), async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id)
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' })
    }

    invoice.paidAmount += req.body.amount
    if (invoice.paidAmount >= invoice.totalAmount) {
      invoice.status = 'paid'
    } else if (invoice.paidAmount > 0) {
      invoice.status = 'partial'
    }
    await invoice.save()
    res.json(invoice)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
