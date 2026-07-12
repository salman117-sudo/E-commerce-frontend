import React from 'react'
import { useNavigate } from 'react-router-dom'

const OrderSuccess = ({ total }) => {
  const navigate = useNavigate()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-3xl">
        ✓
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold uppercase font-integral">
        Order Placed!
      </h1>
      <p className="text-gray-500 text-sm">
        Thank you — your order of ${total} has been received.
      </p>
      <button
        onClick={() => navigate('/category')}
        className="mt-4 bg-black text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        Continue Shopping
      </button>
    </div>
  )
}

export default OrderSuccess