import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/', auth, roleCheck('admin'), async (req, res) => {
  try {
    const stores = await User.find({ role: 'store' }).select('-password').sort({ name: 1 })
    res.json(stores)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const store = await User.findById(req.params.id).select('-password')
    if (!store || store.role !== 'store') {
      return res.status(404).json({ message: 'Store not found' })
    }
    res.json(store)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const { password, ...updateData } = req.body
    const store = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password')
    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }
    res.json(store)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id/status', auth, roleCheck('admin'), async (req, res) => {
  try {
    const store = await User.findByIdAndUpdate(
      req.params.id,
      { isActive: req.body.isActive },
      { new: true }
    ).select('-password')
    if (!store) {
      return res.status(404).json({ message: 'Store not found' })
    }
    res.json(store)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
