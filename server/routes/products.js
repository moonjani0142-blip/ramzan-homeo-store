import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import Product from '../models/Product.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ name: 1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', auth, roleCheck('admin'), async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false })
    if (!product) {
      return res.status(404).json({ message: 'Product not found' })
    }
    res.json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
