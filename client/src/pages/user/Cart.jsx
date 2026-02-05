import { useState } from 'react'
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'

export default function Cart() {
  const [cartItems, setCartItems] = useState([])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-1">Review your order before checkout</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="card-modern p-12 text-center">
          <ShoppingCart size={64} className="mx-auto mb-4 text-gray-300" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <p className="text-gray-400 text-sm mb-4">Browse products to add items to your cart</p>
          <a href="/user/products" className="btn-primary inline-block">
            Browse Products
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="card-modern p-4 flex items-center gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.potency}</p>
                  <p className="text-primary-600 font-medium">Rs. {item.price}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <Plus size={16} />
                  </button>
                </div>
                
                <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div className="card-modern p-6 h-fit">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>Rs. {subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Free</span>
              </div>
            </div>
            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-primary-600">Rs. {subtotal}</span>
              </div>
            </div>
            <button className="btn-primary w-full">
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
