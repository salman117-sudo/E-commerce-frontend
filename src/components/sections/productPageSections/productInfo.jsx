import React, { useState } from 'react'
import StarRating from './starRating'
import useCartStore from '@/store/useCartStore'
import AddedToCartToast from './AddedToCartToast'
import StripeCheckoutModal from '@checkoutPage/StripeCheckoutModal'

const colors = ['#4F4631', '#314F4A', '#31344F']
const sizes = ['Small', 'Medium', 'Large', 'X-Large']

const ProductInfo = ({ product }) => {
  const [selectedColor, setSelectedColor] = useState(colors[0])
  const [selectedSize, setSelectedSize] = useState('Medium')
  const [quantity, setQuantity] = useState(1)
  const [toastItem, setToastItem] = useState(null)
  const [showCheckout, setShowCheckout] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const buildOrderItem = () => ({
    id: product.id,
    name: product.name,
    img: product.img,
    price: product.price,
    oldPrice: product.oldPrice,
    discount: product.discount,
    size: selectedSize,
    color: selectedColor,
    quantity,
  })

  const handleAddToCart = () => {
    addItem(product, selectedSize, selectedColor, quantity)

    setToastItem({
      name: product.name,
      img: product.img,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity,
    })
  }

  const handleBuyNow = () => {
    setShowCheckout(true)
  }

  const buyNowItem = buildOrderItem()
  const subtotal = buyNowItem.price * buyNowItem.quantity
  const deliveryFee = 15
  const total = subtotal + deliveryFee

  return (
    <div className="flex flex-col gap-4 sm:gap-5 md:gap-7">
      {toastItem && (
        <AddedToCartToast item={toastItem} onClose={() => setToastItem(null)} />
      )}

      {showCheckout && (
        <StripeCheckoutModal
          items={[buyNowItem]}
          subtotal={subtotal}
          deliveryFee={deliveryFee}
          total={total}
          isBuyNow
          onClose={() => setShowCheckout(false)}
        />
      )}

      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase font-integral leading-tight">
        {product.name}
      </h1>

      <StarRating rating={product.rating} />

      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl font-bold">${product.price}</span>
        {product.oldPrice && (
          <span className="text-gray-400 line-through text-base sm:text-lg">
            ${product.oldPrice}
          </span>
        )}
        {product.discount && (
          <span className="text-red-500 bg-red-100 text-xs px-2 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}
      </div>

      <p className="text-sm text-gray-500 border-b border-gray-200 pb-3 sm:pb-4">
        This is a placeholder description for {product.name}. Replace this
        with real copy — fabric, fit, and care details.
      </p>

      <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
        <span className="text-sm text-gray-500">Select Colors</span>
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: c }}
            >
              {selectedColor === c && (
                <span className="text-white text-xs">✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
        <span className="text-sm text-gray-500">Choose Size</span>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border ${
                selectedSize === s
                  ? 'bg-black text-white border-black'
                  : 'border-gray-300 text-gray-600'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center justify-center border border-gray-300 rounded-full px-4 sm:px-6 py-2 gap-3 sm:gap-4 shrink-0">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="font-bold"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="font-bold"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={handleAddToCart}
          className="flex-1 border border-black text-black rounded-full py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-100 transition-colors"
        >
          Add to Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 bg-black text-white rounded-full py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

export default ProductInfo

// import React, { useState } from 'react'
// import StarRating from './starRating'
// import { useCart } from '@/context/CartContext'
// import AddedToCartToast from './AddedToCartToast'

// const colors = ['#4F4631', '#314F4A', '#31344F']
// const sizes = ['Small', 'Medium', 'Large', 'X-Large']

// const ProductInfo = ({ product }) => {
//   const [selectedColor, setSelectedColor] = useState(colors[0])
//   const [selectedSize, setSelectedSize] = useState('Medium')
//   const [quantity, setQuantity] = useState(1)
//   const [toastItem, setToastItem] = useState(null)
//   const { addItem } = useCart()

//   const handleAddToCart = () => {
//     addItem(product, selectedSize, selectedColor, quantity)

//     setToastItem({
//       name: product.name,
//       img: product.img,
//       price: product.price,
//       size: selectedSize,
//       color: selectedColor,
//       quantity,
//     })
//   }

//   return (
//     <div className="flex flex-col gap-4 sm:gap-5 md:gap-7">
//       {toastItem && (
//         <AddedToCartToast item={toastItem} onClose={() => setToastItem(null)} />
//       )}

//       <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase font-integral leading-tight">
//         {product.name}
//       </h1>

//       <StarRating rating={product.rating} />

//       <div className="flex items-center gap-2 sm:gap-3">
//         <span className="text-xl sm:text-2xl font-bold">${product.price}</span>
//         {product.oldPrice && (
//           <span className="text-gray-400 line-through text-base sm:text-lg">
//             ${product.oldPrice}
//           </span>
//         )}
//         {product.discount && (
//           <span className="text-red-500 bg-red-100 text-xs px-2 py-1 rounded-full">
//             -{product.discount}%
//           </span>
//         )}
//       </div>

//       <p className="text-sm text-gray-500 border-b border-gray-200 pb-3 sm:pb-4">
//         This is a placeholder description for {product.name}. Replace this
//         with real copy — fabric, fit, and care details.
//       </p>

//       <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
//         <span className="text-sm text-gray-500">Select Colors</span>
//         <div className="flex gap-2">
//           {colors.map((c) => (
//             <button
//               key={c}
//               onClick={() => setSelectedColor(c)}
//               className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0"
//               style={{ backgroundColor: c }}
//             >
//               {selectedColor === c && (
//                 <span className="text-white text-xs">✓</span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
//         <span className="text-sm text-gray-500">Choose Size</span>
//         <div className="flex flex-wrap gap-2">
//           {sizes.map((s) => (
//             <button
//               key={s}
//               onClick={() => setSelectedSize(s)}
//               className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border ${
//                 selectedSize === s
//                   ? 'bg-black text-white border-black'
//                   : 'border-gray-300 text-gray-600'
//               }`}
//             >
//               {s}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center gap-3 sm:gap-4">
//         <div className="flex items-center justify-center border border-gray-300 rounded-full px-4 sm:px-6 py-2 gap-3 sm:gap-4 shrink-0">
//           <button
//             onClick={() => setQuantity((q) => Math.max(1, q - 1))}
//             className="font-bold"
//           >
//             -
//           </button>
//           <span>{quantity}</span>
//           <button
//             onClick={() => setQuantity((q) => q + 1)}
//             className="font-bold"
//           >
//             +
//           </button>
//         </div>
//         <button
//           onClick={handleAddToCart}
//           className="flex-1 bg-black text-white rounded-full py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   )
// }

// export default ProductInfo

// // import React, { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import StarRating from './starRating'
// // import { useCart } from '@/context/CartContext'

// // const colors = ['#4F4631', '#314F4A', '#31344F']
// // const sizes = ['Small', 'Medium', 'Large', 'X-Large']

// // const ProductInfo = ({ product }) => {
// //   const [selectedColor, setSelectedColor] = useState(colors[0])
// //   const [selectedSize, setSelectedSize] = useState('Medium')
// //   const [quantity, setQuantity] = useState(1)
// //   const { addItem } = useCart()
// //   const navigate = useNavigate()

// //   const handleAddToCart = () => {
// //     addItem(product, selectedSize, selectedColor, quantity)
// //     navigate('/cart')
// //   }

// //   return (
// //     <div className="flex flex-col gap-4 sm:gap-5 md:gap-7">
// //       <h1 className="text-xl sm:text-2xl md:text-4xl font-bold uppercase font-integral leading-tight">
// //         {product.name}
// //       </h1>

// //       <StarRating rating={product.rating} />

// //       <div className="flex items-center gap-2 sm:gap-3">
// //         <span className="text-xl sm:text-2xl font-bold">${product.price}</span>
// //         {product.oldPrice && (
// //           <span className="text-gray-400 line-through text-base sm:text-lg">
// //             ${product.oldPrice}
// //           </span>
// //         )}
// //         {product.discount && (
// //           <span className="text-red-500 bg-red-100 text-xs px-2 py-1 rounded-full">
// //             -{product.discount}%
// //           </span>
// //         )}
// //       </div>

// //       <p className="text-sm text-gray-500 border-b border-gray-200 pb-3 sm:pb-4">
// //         This is a placeholder description for {product.name}. Replace this
// //         with real copy — fabric, fit, and care details.
// //       </p>

// //       <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
// //         <span className="text-sm text-gray-500">Select Colors</span>
// //         <div className="flex gap-2">
// //           {colors.map((c) => (
// //             <button
// //               key={c}
// //               onClick={() => setSelectedColor(c)}
// //               className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0"
// //               style={{ backgroundColor: c }}
// //             >
// //               {selectedColor === c && (
// //                 <span className="text-white text-xs">✓</span>
// //               )}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-2 border-b border-gray-200 pb-3 sm:pb-4">
// //         <span className="text-sm text-gray-500">Choose Size</span>
// //         <div className="flex flex-wrap gap-2">
// //           {sizes.map((s) => (
// //             <button
// //               key={s}
// //               onClick={() => setSelectedSize(s)}
// //               className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm border ${
// //                 selectedSize === s
// //                   ? 'bg-black text-white border-black'
// //                   : 'border-gray-300 text-gray-600'
// //               }`}
// //             >
// //               {s}
// //             </button>
// //           ))}
// //         </div>
// //       </div>

// //       <div className="flex items-center gap-3 sm:gap-4">
// //         <div className="flex items-center justify-center border border-gray-300 rounded-full px-4 sm:px-6 py-2 gap-3 sm:gap-4 shrink-0">
// //           <button
// //             onClick={() => setQuantity((q) => Math.max(1, q - 1))}
// //             className="font-bold"
// //           >
// //             -
// //           </button>
// //           <span>{quantity}</span>
// //           <button
// //             onClick={() => setQuantity((q) => q + 1)}
// //             className="font-bold"
// //           >
// //             +
// //           </button>
// //         </div>
// //         <button
// //           onClick={handleAddToCart}
// //           className="flex-1 bg-black text-white rounded-full py-2.5 sm:py-3 text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors"
// //         >
// //           Add to Cart
// //         </button>
// //       </div>
// //     </div>
// //   )
// // }

// // export default ProductInfo;