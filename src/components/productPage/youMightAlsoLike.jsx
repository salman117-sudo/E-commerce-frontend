import React from 'react'
import { Link } from 'react-router-dom'
import { product2 } from '@/data/products'
import StarRating from './starRating'

const YouMightAlsoLike = ({ currentId }) => {
  const relatedProducts = product2.filter((p) => p.id !== currentId).slice(0, 4)

  return (
    <div className="mt-16 mb-16 sm:mt-20 sm:mb-20">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase font-integral text-center mb-6 sm:mb-8">
        You Might Also Like
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {relatedProducts.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="flex flex-col gap-2 rounded-2xl p-2 sm:p-3"
          >
            <div className="w-full aspect-295/298 bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={p.img}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="font-medium text-xs sm:text-sm truncate">{p.name}</p>
            <StarRating rating={p.rating} />
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="font-semibold text-sm sm:text-base">${p.price}</span>
              {p.oldPrice && (
                <span className="text-gray-400 line-through text-xs sm:text-sm">
                  ${p.oldPrice}
                </span>
              )}
              {p.discount && (
                <span className="text-red-500 bg-red-100 text-[10px] sm:text-xs px-2 py-0.5 rounded-full">
                  -{p.discount}%
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default YouMightAlsoLike;