import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

// Auth Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

// Admin Pages
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/admin/Dashboard'
import Inventory from './pages/admin/Inventory'
import Orders from './pages/admin/Orders'
import Invoices from './pages/admin/Invoices'
import Stores from './pages/admin/Stores'
import Products from './pages/admin/Products'
import PotencyRange from './pages/admin/PotencyRange'
import CashFlow from './pages/admin/CashFlow'
import AdminManagement from './pages/admin/AdminManagement'
import UserManagement from './pages/admin/UserManagement'

// User Pages
import UserLayout from './layouts/UserLayout'
import UserDashboard from './pages/user/UserDashboard'
import BrowseProducts from './pages/user/BrowseProducts'
import Cart from './pages/user/Cart'
import UserOrders from './pages/user/UserOrders'
import Profile from './pages/user/Profile'

// Context
import { AuthProvider, useAuth } from './context/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth()
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner"></div>
      </div>
    )
  }
  
  if (!user) {
    return <Navigate to="/login" replace />
  }
  
  if (requiredRole && user.role !== requiredRole && user.role !== 'main_admin') {
    return <Navigate to="/" replace />
  }
  
  return children
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute requiredRole="admin">
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user-management" element={<UserManagement />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="orders" element={<Orders />} />
            <Route path="invoices" element={<Invoices />} />
            <Route path="stores" element={<Stores />} />
            <Route path="products" element={<Products />} />
            <Route path="potency" element={<PotencyRange />} />
            <Route path="cashflow" element={<CashFlow />} />
            <Route path="admin-management" element={<AdminManagement />} />
          </Route>
          
          {/* User Routes */}
          <Route path="/user" element={
            <ProtectedRoute requiredRole="user">
              <UserLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="/user/dashboard" replace />} />
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="products" element={<BrowseProducts />} />
            <Route path="cart" element={<Cart />} />
            <Route path="orders" element={<UserOrders />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
