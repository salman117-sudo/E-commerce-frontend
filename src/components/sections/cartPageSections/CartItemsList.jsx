import React from 'react'
import CartItem from './CartItem'

const CartItemsList = ({ items, onUpdateQuantity, onRemove, onBuyNow }) => {
  return (
    <div className="w-full lg:flex-1 rounded-2xl border border-gray-200 p-4 sm:p-6 divide-y divide-gray-200">
      {items.map((item) => (
        <CartItem
          key={item.cartItemId}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemove}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  )
}

export default CartItemsList

// import React from 'react'
// import CartItem from './CartItem'

// const CartItemsList = ({ items, onUpdateQuantity, onRemove }) => {
//   return (
//     <div className="w-full lg:flex-1 rounded-2xl border border-gray-200 p-4 sm:p-6 divide-y divide-gray-200">
//       {items.map((item) => (
//         <CartItem
//           key={item.cartItemId}
//           item={item}
//           onUpdateQuantity={onUpdateQuantity}
//           onRemove={onRemove}
//         />
//       ))}
//     </div>
//   )
// }

// export default CartItemsList