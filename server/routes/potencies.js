import express from 'express'
import { auth, roleCheck } from '../middleware/auth.js'
import Potency from '../models/Potency.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  try {
    const potencies = await Potency.find({ isActive: true }).sort({ name: 1 })
    res.json(potencies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/', auth, roleCheck('admin'), async (req, res) => {
  try {
    const potency = new Potency(req.body)
    await potency.save()
    res.status(201).json(potency)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const potency = await Potency.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!potency) {
      return res.status(404).json({ message: 'Potency not found' })
    }
    res.json(potency)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', auth, roleCheck('admin'), async (req, res) => {
  try {
    const potency = await Potency.findByIdAndUpdate(req.params.id, { isActive: false })
    if (!potency) {
      return res.status(404).json({ message: 'Potency not found' })
    }
    res.json({ message: 'Potency deleted' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
