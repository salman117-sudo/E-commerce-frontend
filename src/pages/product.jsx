import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { allProducts } from '@/data/products'
import {
  ProductGallery,
  ProductInfo,
  RatingReviews,
  YouMightAlsoLike,
} from '@productPage'

function Product() {
  const { id } = useParams()
  const product = allProducts.find((p) => p.id === Number(id))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [id])

  if (!product) {
    return (
      <div className="text-center py-20">
        <p className="text-xl font-medium">Product not found</p>
        <Link to="/" className="text-sm underline">Go back home</Link>
      </div>
    )
  }

  return (
    <div className="max-w-480 mx-auto px-4 sm:px-6 md:px-12 lg:px-25 py-8 sm:py-14 md:py-20 lg:py-10 font-satoshi">
      <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        {' > '}
        <Link to="/category" className="hover:text-black transition-colors">Shop</Link>
        {' > '}
        <span>Men</span>
        {' > '}
        <span className="text-black">{product.name}</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 mb-8 sm:mb-10">
        <ProductGallery product={product} />
        <ProductInfo product={product} />
      </div>

      <RatingReviews />
      <YouMightAlsoLike />
    </div>
  )
}

export default Product