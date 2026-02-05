import express from 'express'
import bcrypt from 'bcryptjs'
import { auth, roleCheck } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/users', auth, roleCheck('admin'), async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/users', auth, roleCheck('admin'), async (req, res) => {
  try {
    const { name, email, password, role, storeName, phone, address } = req.body
    
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' })
    }

    const user = new User({
      name,
      email,
      password,
      role,
      storeName,
      phone,
      address
    })
    await user.save()
    
    const userResponse = user.toObject()
    delete userResponse.password
    res.status(201).json(userResponse)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/users/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const { password, ...updateData } = req.body
    
    if (password) {
      updateData.password = await bcrypt.hash(password, 12)
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true }).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/users/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { isActive: false })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json({ message: 'User deactivated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
