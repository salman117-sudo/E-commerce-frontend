import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Trash2 } from 'lucide-react'

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const navigate = useNavigate()

  const handleBuyNow = () => {
    navigate('/checkout', {
      state: {
        buyNowItem: {
          id: item.id,
          name: item.name,
          img: item.img,
          price: item.price,
          oldPrice: item.oldPrice,
          discount: item.discount,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-3 py-4 first:pt-0 last:pb-0">
      <div className="flex gap-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
          <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="font-medium truncate">{item.name}</h3>
              <p className="text-xs sm:text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">
                Color:
                <span
                  className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                />
              </p>
            </div>
            <button
              onClick={() => onRemove(item.cartItemId)}
              className="text-red-500 shrink-0"
            >
              <Trash2 size={18} />
            </button>
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="font-bold">${item.price}</span>
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 gap-3">
              <button
                onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                className="font-bold text-sm"
              >
                -
              </button>
              <span className="text-sm">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                className="font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBuyNow}
        className="self-end border border-black text-black rounded-full px-5 py-1.5 text-xs sm:text-sm font-medium hover:bg-black hover:text-white transition-colors"
      >
        Buy Now
      </button>
    </div>
  )
}

export default CartItem




// import React from 'react'
// import { Trash2 } from 'lucide-react'

// const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
//   return (
//     <div className="flex gap-4 py-4 first:pt-0 last:pb-0">
//       <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-xl overflow-hidden shrink-0">
//         <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
//       </div>

//       <div className="flex-1 flex flex-col justify-between min-w-0">
//         <div className="flex justify-between items-start gap-2">
//           <div className="min-w-0 font-satoshi">
//             <h3 className="font-bold truncate text-[20px]">{item.name}</h3>
//             <p className="text-xs sm:text-sm text-gray-500 font-satoshi">Size: {item.size}</p>
//             <p className="text-xs sm:text-sm text-gray-500 flex items-center gap-1 font-satoshi">
//               Color:
//               <span
//                 className="w-3 h-3 rounded-full inline-block"
//                 style={{ backgroundColor: item.color }}
//               />
//             </p>
//           </div>
//           <button
//             onClick={() => onRemove(item.cartItemId)}
//             className="text-red-500 shrink-0"
//           >
//             <Trash2 size={18} />
//           </button>
//         </div>

//         <div className="flex items-center justify-between mt-2">
//           <span className="font-bold font-satoshi">${item.price}</span>
//           <div className="flex items-center border border-gray-300 rounded-full px-3 py-1 gap-3">
//             <button
//               onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
//               className="font-bold text-sm"
//             >
//               -
//             </button>
//             <span className="text-sm">{item.quantity}</span>
//             <button
//               onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
//               className="font-bold text-sm"
//             >
//               +
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartItem