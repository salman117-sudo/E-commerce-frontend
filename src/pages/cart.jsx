import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CartItemsList, OrderSummary, EmptyCart } from '@cartPage'
import StripeCheckoutModal from '@checkoutPage/StripeCheckoutModal'
import useCartStore from '@/store/useCartStore'

const Cart = () => {
  const cart = useCartStore((s) => s.cart)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)

  const [discountPercent, setDiscountPercent] = useState(0)
  const [checkoutItems, setCheckoutItems] = useState(null) // null = modal closed

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discountAmount = Math.round(subtotal * (discountPercent / 100))
  const deliveryFee = cart.length > 0 ? 15 : 0
  const total = subtotal - discountAmount + deliveryFee

  const handleApplyPromo = (code) => {
    if (code.trim().toLowerCase() === 'save20') {
      setDiscountPercent(20)
    } else {
      setDiscountPercent(0)
    }
  }

  // Buy Now on a single cart item
  const handleBuyNowItem = (item) => {
    const itemSubtotal = item.price * item.quantity
    setCheckoutItems({
      items: [item],
      subtotal: itemSubtotal,
      deliveryFee: 15,
      total: itemSubtotal + 15,
      isBuyNow: true,
    })
  }

  // Go to Checkout for the whole cart
  const handleCheckoutAll = () => {
    setCheckoutItems({
      items: cart,
      subtotal,
      deliveryFee,
      total,
      isBuyNow: false,
    })
  }

  if (cart.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-30">
      <p className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-black transition-colors">Home</Link>
        {' > '}
        <span className="text-black">Cart</span>
      </p>

      <h1 className="text-3xl sm:text-4xl font-bold uppercase font-integral mb-6">
        Your Cart
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <CartItemsList
          items={cart}
          onUpdateQuantity={updateQuantity}
          onRemove={removeItem}
          onBuyNow={handleBuyNowItem}
        />

        <OrderSummary
          subtotal={subtotal}
          discountPercent={discountPercent}
          discountAmount={discountAmount}
          deliveryFee={deliveryFee}
          total={total}
          onApplyPromo={handleApplyPromo}
          onCheckout={handleCheckoutAll}
        />
      </div>

      {checkoutItems && (
        <StripeCheckoutModal
          items={checkoutItems.items}
          subtotal={checkoutItems.subtotal}
          deliveryFee={checkoutItems.deliveryFee}
          total={checkoutItems.total}
          isBuyNow={checkoutItems.isBuyNow}
          onClose={() => setCheckoutItems(null)}
        />
      )}
    </div>
  )
}

export default Cart

// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { CartItemsList, OrderSummary, EmptyCart } from '@cartPage'
// import { useCart } from '@/context/CartContext'

// const Cart = () => {
//   const { cart, updateQuantity, removeItem } = useCart()
//   const [discountPercent, setDiscountPercent] = useState(0)

//   const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
//   const discountAmount = Math.round(subtotal * (discountPercent / 100))
//   const deliveryFee = cart.length > 0 ? 15 : 0
//   const total = subtotal - discountAmount + deliveryFee

//   const handleApplyPromo = (code) => {
//     // placeholder logic — replace with real promo validation
//     if (code.trim().toLowerCase() === 'save20') {
//       setDiscountPercent(20)
//     } else {
//       setDiscountPercent(0)
//     }
//   }

//   if (cart.length === 0) {
//     return <EmptyCart />
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 mb-30">
//       <p className="text-sm text-gray-500 mb-4">
//         <Link to="/" className="hover:text-black transition-colors">Home</Link>
//         {' > '}
//         <span className="text-black">Cart</span>
//       </p>

//       <h1 className="text-3xl sm:text-4xl font-bold uppercase font-integral mb-6">
//         Your Cart
//       </h1>

//       <div className="flex flex-col lg:flex-row gap-6 items-start">
//         <CartItemsList
//           items={cart}
//           onUpdateQuantity={updateQuantity}
//           onRemove={removeItem}
//         />

//         <OrderSummary
//           subtotal={subtotal}
//           discountPercent={discountPercent}
//           discountAmount={discountAmount}
//           deliveryFee={deliveryFee}
//           total={total}
//           onApplyPromo={handleApplyPromo}
//         />
//       </div>
//     </div>
//   )
// }

// export default Cart