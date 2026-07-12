import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCheckout = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Nothing to checkout</h1>
      <Link to="/category" className="underline text-sm">
        Continue shopping
      </Link>
    </div>
  )
}

export default EmptyCheckout