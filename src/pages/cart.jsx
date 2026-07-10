import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Trash2 } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart()
  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState(0)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = Math.round(subtotal * (discountPercent / 100))
  const deliveryFee = cart.length > 0 ? 15 : 0
  const total = subtotal - discountAmount + deliveryFee

  const handleApplyPromo = () => {
    // placeholder logic — replace with real promo validation
    if (promoCode.trim().toLowerCase() === 'save20') {
      setDiscountPercent(20)
    } else {
      setDiscountPercent(0)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/category" className="underline text-sm">
          Continue shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-20">
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        {' > '}
        <span className="text-black">Cart</span>
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold uppercase font-integral mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Cart items */}
        <div className="w-full lg:flex-1 rounded-2xl border border-gray-200 p-4 sm:p-6 divide-y divide-gray-200">
          {cart.map((item) => (
            <div key={item.cartItemId} className="flex gap-4 py-4 first:pt-0 last:pb-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex justify-between items-start gap-2">
                  <div className="min-w-0">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Size: {item.size}</p>
                    <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                      Color:
                      <span
                        className="w-3 h-3 rounded-full inline-block"
                        style={{ backgroundColor: item.color }}
                      />
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.cartItemId)}
                    className="text-red-500 shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold">${item.price}</span>
                  <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 gap-3">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="w-full lg:w-95 rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-4 shrink-0">
          <h2 className="text-lg font-bold">Order Summary</h2>

          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Subtotal</span>
            <span className="font-bold">${subtotal}</span>
          </div>

          {discountPercent > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Discount (-{discountPercent}%)</span>
              <span className="font-bold text-red-500">-${discountAmount}</span>
            </div>
          )}

          <div className="flex justify-between text-sm border-b border-gray-200 pb-4">
            <span className="text-gray-500">Delivery Fee</span>
            <span className="font-bold">${deliveryFee}</span>
          </div>

          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
            />
            <button
              onClick={handleApplyPromo}
              className="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              Apply
            </button>
          </div>

          <button className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
            Go to Checkout <span>→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart