import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import routes
import authRoutes from './routes/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import invoiceRoutes from './routes/invoices.js'
import storeRoutes from './routes/stores.js'
import potencyRoutes from './routes/potencies.js'
import adminRoutes from './routes/admin.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(compression())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// Database connection
let isDbConnected = false
const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('⚠️ MONGODB_URI not set - database features will not work')
    console.warn('⚠️ Please set MONGODB_URI environment variable to enable database functionality')
    return
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    isDbConnected = true
    console.log('✅ MongoDB Connected Successfully')
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message)
    console.warn('⚠️ App running without database connection')
  }
}

connectDB()

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/invoices', invoiceRoutes)
app.use('/api/stores', storeRoutes)
app.use('/api/potencies', potencyRoutes)
app.use('/api/admin', adminRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Ramzan Homeo. Store & Clinic API is running',
    timestamp: new Date().toISOString()
  })
})

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  })
} else {
  // 404 handler for development
  app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' })
  })
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost'
app.listen(PORT, host, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
})

export default app
