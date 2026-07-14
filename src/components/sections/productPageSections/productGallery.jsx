import React, { useState } from 'react'

const ProductGallery = ({ product }) => {
  const thumbnails = product.images || [product.img, product.img, product.img]
  const [mainImg, setMainImg] = useState(thumbnails[0])

  return (
    <div className="w-full max-w-[1920px] min-w-75 mx-auto flex flex-col md:flex-row gap-3 sm:gap-4">
      <div className="flex md:flex-col flex-row gap-8 order-2 md:order-1 justify-center md:justify-start overflow-x-auto md:overflow-visible">
        {thumbnails.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setMainImg(thumb)}
            className={`shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-38 md:h-38 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center ${
              mainImg === thumb ? 'border-black' : 'border-transparent'
            }`}
          >
            <img
              src={thumb}
              alt={`${product.name} thumbnail ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      <div className="order-1 md:order-2 flex-1 aspect-square md:aspect-4/4 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={mainImg}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default ProductGallery

// import React, { useState } from 'react'

// const ProductGallery = ({ product }) => {
//   const [mainImg, setMainImg] = useState(product.img)
//   const thumbnails = product.images || [product.img, product.img, product.img]

//   return (
//     <div className="w-full max-w-[1920px] min-w-75 mx-auto flex flex-col md:flex-row gap-3 sm:gap-4">
//       <div className="flex md:flex-col flex-row gap-8 order-2 md:order-1 justify-center md:justify-start overflow-x-auto md:overflow-visible">
//         {thumbnails.map((thumb, i) => (
//           <button
//             key={i}
//             onClick={() => setMainImg(thumb)}
//             className={`shrink-0 w-16 h-16 sm:w-24 sm:h-24 md:w-38 md:h-38 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center ${
//               mainImg === thumb ? 'border-black' : 'border-transparent'
//             }`}
//           >
//             <img
//               src={thumb}
//               alt={`${product.name} thumbnail ${i + 1}`}
//               className="w-full h-full object-cover"
//             />
//           </button>
//         ))}
//       </div>

//       <div className="order-1 md:order-2 flex-1 aspect-square md:aspect-4/4 bg-gray-100 rounded-2xl overflow-hidden flex items-center justify-center">
//         <img
//           src={mainImg}
//           alt={product.name}
//           className="w-full h-full object-cover"
//         />
//       </div>
//     </div>
//   )
// }

// export default ProductGallery