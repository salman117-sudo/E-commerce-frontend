import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import {
  ShippingForm,
  PaymentForm,
  CheckoutSummary,
  OrderSuccess,
  EmptyCheckout,
} from '@checkoutPage'

const Checkout = () => {
  const location = useLocation()
  const { cart, clearCart } = useCart()
  const [isPaid, setIsPaid] = useState(false)

  const buyNowItem = location.state?.buyNowItem
  const items = buyNowItem ? [buyNowItem] : cart

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const deliveryFee = items.length > 0 ? 15 : 0
  const total = subtotal + deliveryFee

  const [form, setForm] = useState({
    fullName: '',
    address: '',
    city: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handlePay = (e) => {
    e.preventDefault()
    setIsPaid(true)

    if (!buyNowItem) {
      clearCart()
    }
  }

  if (items.length === 0 && !isPaid) {
    return <EmptyCheckout />
  }

  if (isPaid) {
    return <OrderSuccess total={total} />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-20">
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        {' > '}
        <span className="text-black">Checkout</span>
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold uppercase font-integral mb-6">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <form
          onSubmit={handlePay}
          className="w-full lg:flex-1 rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-6"
        >
          <ShippingForm form={form} onChange={handleChange} />
          <PaymentForm form={form} onChange={handleChange} />

          <button
            type="submit"
            className="mt-2 w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors"
          >
            Pay ${total}
          </button>
        </form>

        <CheckoutSummary
          items={items}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
        />
      </div>
    </div>
  )
}

export default Checkout