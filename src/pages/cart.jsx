import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartItemsList, OrderSummary, EmptyCart } from '@cartPage'
import { useCart } from '@/context/CartContext'

const Cart = () => {
  const { cart, updateQuantity, removeItem } = useCart()
  const [discountPercent, setDiscountPercent] = useState(0)

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = Math.round(subtotal * (discountPercent / 100))
  const deliveryFee = cart.length > 0 ? 15 : 0
  const total = subtotal - discountAmount + deliveryFee

  const handleApplyPromo = (code) => {
    // placeholder logic — replace with real promo validation
    if (code.trim().toLowerCase() === 'save20') {
      setDiscountPercent(20)
    } else {
      setDiscountPercent(0)
    }
  }

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-30">
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        {' > '}
        <span className="text-black">Cart</span>
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold uppercase font-integral mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <CartItemsList
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
        />

        <OrderSummary
          subtotal={subtotal}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          deliveryFee={deliveryFee}
          total={total}
          onApplyPromo={handleApplyPromo}
        />
      </div>
    </div>
  )
}

export default Cart