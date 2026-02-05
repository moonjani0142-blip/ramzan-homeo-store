import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import Order from '../models/Order.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { user: req.user._id }
    const orders = await Order.find(query)
      .populate('user', 'name storeName')
      .populate('items.product', 'name')
      .sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name storeName email')
      .populate('items.product', 'name price')
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const order = new Order({
      ...req.body,
      user: req.user._id
    })
    await order.save()
    res.status(201).json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id/status', auth, roleCheck('admin'), async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!order) {
      return res.status(404).json({ message: 'Order not found' })
    }
    res.json(order)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
