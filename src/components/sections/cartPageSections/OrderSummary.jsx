import React, { useState } from 'react'

const OrderSummary = ({ subtotal, discountPercent, discountAmount, deliveryFee, total, onApplyPromo, onCheckout }) => {
  const [promoCode, setPromoCode] = useState('')

  const handleApply = () => {
    onApplyPromo(promoCode)
  }

  return (
    <div className="w-full lg:w-95 rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-4 shrink-0">
      <h2 className="text-lg font-bold">Order Summary</h2>

      <div className="flex justify-between text-sm">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-bold">${subtotal}</span>
      </div>

      {discountPercent > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Discount (-{discountPercent}%)</span>
          <span className="font-bold text-red-500">-${discountAmount}</span>
        </div>
      )}

      <div className="flex justify-between text-sm border-b border-gray-200 pb-4">
        <span className="text-gray-500">Delivery Fee</span>
        <span className="font-bold">${deliveryFee}</span>
      </div>

      <div className="flex justify-between text-base font-bold">
        <span>Total</span>
        <span>${total}</span>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Add promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
        />
        <button
          onClick={handleApply}
          className="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>
      </div>

      <button
        type="button"
        onClick={onCheckout}
        className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
      >
        Go to Checkout <span>→</span>
      </button>
    </div>
  )
}

export default OrderSummary

// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'

// const OrderSummary = ({ subtotal, discountPercent, discountAmount, deliveryFee, total, onApplyPromo }) => {
//   const [promoCode, setPromoCode] = useState('')
//   const navigate = useNavigate()

//   const handleApply = () => {
//     onApplyPromo(promoCode)
//   }

//   return (
//     <div className="w-full lg:w-[380px] rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-4 shrink-0">
//       <h2 className="text-lg font-bold">Order Summary</h2>

//       <div className="flex justify-between text-sm">
//         <span className="text-gray-500">Subtotal</span>
//         <span className="font-bold">${subtotal}</span>
//       </div>

//       {discountPercent > 0 && (
//         <div className="flex justify-between text-sm">
//           <span className="text-gray-500">Discount (-{discountPercent}%)</span>
//           <span className="font-bold text-red-500">-${discountAmount}</span>
//         </div>
//       )}

//       <div className="flex justify-between text-sm border-b border-gray-200 pb-4">
//         <span className="text-gray-500">Delivery Fee</span>
//         <span className="font-bold">${deliveryFee}</span>
//       </div>

//       <div className="flex justify-between text-base font-bold">
//         <span>Total</span>
//         <span>${total}</span>
//       </div>

//       <div className="flex gap-2">
//         <input
//           type="text"
//           placeholder="Add promo code"
//           value={promoCode}
//           onChange={(e) => setPromoCode(e.target.value)}
//           className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none"
//         />
//         <button
//           onClick={handleApply}
//           className="bg-black text-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
//         >
//           Apply
//         </button>
//       </div>

//       <button
//         type="button"
//         onClick={() => navigate('/checkout')}
//         className="w-full bg-black text-white rounded-full py-3 font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
//       >
//         Go to Checkout <span>→</span>
//       </button>
//     </div>
//   )
// }

// export default OrderSummary


