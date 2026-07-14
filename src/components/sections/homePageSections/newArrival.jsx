import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { products } from '@/data/products'

const StarRating = ({ rating }) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    const fill =
      rating >= i ? 100 : rating > i - 1 ? (rating - (i - 1)) * 100 : 0
    stars.push(
      <span key={i} className="relative inline-block w-4 h-4">
        <span className="absolute inset-0 text-gray-300">★</span>
        <span
          className="absolute inset-0 text-yellow-400 overflow-hidden"
          style={{ width: `${fill}%` }}
        >
          ★
        </span>
      </span>
    )
  }
  return (
    <div className="flex items-center gap-1">
      <div className="flex">{stars}</div>
      <span className="text-sm text-gray-500">{rating}/5</span>
    </div>
  )
}

const ProductCard = ({ product }) => (
  <Link
    to={`/product/${product.id}`}
    className="flex flex-col gap-2 rounded-2xl p-3 sm:p-4"
  >
    <img
      src={product.img}
      alt={product.name}
      className="w-full h-auto rounded-xl object-cover"
    />
    <p className="font-medium text-sm sm:text-base">{product.name}</p>
    <StarRating rating={product.rating} />
    <div className="flex items-center gap-2">
      <span className="font-semibold">${product.price}</span>
      {product.oldPrice && (
        <span className="text-gray-400 line-through text-sm">
          ${product.oldPrice}
        </span>
      )}
      {product.discount && (
        <span className="text-red-500 bg-red-100 text-xs px-2 py-0.5 rounded-full">
          -{product.discount}%
        </span>
      )}
    </div>
  </Link>
)

const Newarrival = () => {
  const [showAll, setShowAll] = useState(false)

  const visibleProducts = showAll ? products : products.slice(0, 4)

  return (
    <div className="max-w-480 min-w-75 mx-auto px-4 md:px-25 py-10 flex flex-col gap-8">
      <h2 className="uppercase text-3xl sm:text-[48px] font-bold font-integral text-center">
        New Arrivals
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-1 font-satoshi">
        {visibleProducts.map((product, index) => (
          <div
            key={product.id}
            className={index >= 2 && !showAll ? 'hidden sm:block' : ''}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setShowAll((prev) => !prev)}
          className="border border-gray-300 rounded-full sm:px-17 px-27 py-1 font-medium hover:bg-black hover:text-white transition-colors"
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>
      <div className="w-full border-t border-dashed border-black/10 mt-7"></div>
    </div>
  )
}

export default Newarrival