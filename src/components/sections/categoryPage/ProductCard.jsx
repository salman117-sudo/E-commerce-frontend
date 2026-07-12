import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

const ProductCard = ({ id, img, name, rating, price, oldPrice, discount }) => {
  return (
    <Link to={`/product/${id}`} className="cursor-pointer font-satoshi font-bold block">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-100">
        <img src={img} alt={name} className="h-full w-full object-cover" />
      </div>
      <h4 className="mb-1 text-sm font-medium sm:text-[20px] font-bold">{name}</h4>
      <div className="mb-1 flex items-center gap-1">
        <Star size={14} className="fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-gray-500">{rating}/5</span>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-bold">${price}</span>
        {oldPrice && <span className="text-gray-400 line-through">${oldPrice}</span>}
        {discount && (
          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">
            -{discount}%
          </span>
        )}
      </div>
    </Link>
  )
}

export default ProductCard




// import { Star } from 'lucide-react'

// const ProductCard = ({ img, name, rating, price, oldPrice, discount }) => {
//   return (
//     <div className="cursor-pointer  font-satoshi font-bold">
//       <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl bg-gray-100">
//         <img src={img} alt={name} className="h-full w-full object-cover" />
//       </div>
//       <h4 className="mb-1 text-sm font-medium sm:text-[20px] font-bold">{name}</h4>
//       <div className="mb-1 flex items-center gap-1">
//         <Star size={14} className="fill-yellow-400 text-yellow-400" />
//         <span className="text-sm text-gray-500">{rating}/5</span>
//       </div>
//       <div className="flex flex-wrap items-center gap-2">
//         <span className="font-bold">${price}</span>
//         {oldPrice && <span className="text-gray-400 line-through">${oldPrice}</span>}
//         {discount && (
//           <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-500">
//             -{discount}%
//           </span>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ProductCard