import React from 'react'

const StarRating = ({ rating, showLabel = true }) => {
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
      {showLabel && <span className="text-sm text-gray-500">{rating}/5</span>}
    </div>
  )
}

export default StarRating