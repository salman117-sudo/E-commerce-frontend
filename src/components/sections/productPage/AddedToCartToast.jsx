import React from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

const AddedToCartToast = ({ item, onClose }) => {
  if (!item) return null

  return (
    <div className="fixed top-4 right-4 left-4 sm:left-auto sm:w-[380px] z-50 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 flex flex-col gap-3 animate-slide-in">
      <div className="flex items-start justify-between">
        <span className="text-sm font-semibold text-green-600 flex items-center gap-1.5">
          <span className="w-4 h-4 rounded-full bg-green-500 text-white text-[10px] flex items-center justify-center">
            ✓
          </span>
          Added to Cart
        </span>
        <button onClick={onClose} className="text-gray-400 hover:text-black">
          <X size={16} />
        </button>
      </div>

      <div className="flex gap-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{item.name}</p>
          <p className="text-xs text-gray-500">Size: {item.size}</p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Color:</span>
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: item.color }}
            />
            <span>· Qty: {item.quantity}</span>
          </div>
          <p className="font-bold text-sm mt-1">${item.price}</p>
        </div>
      </div>

      <Link
        to="/cart"
        className="w-full text-center bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
      >
        View Cart
      </Link>
    </div>
  )
}

export default AddedToCartToast