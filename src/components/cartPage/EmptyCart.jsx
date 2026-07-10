import React from 'react'
import { Link } from 'react-router-dom'

const EmptyCart = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
      <Link to="/category" className="underline text-sm">
        Continue shopping
      </Link>
    </div>
  )
}

export default EmptyCart