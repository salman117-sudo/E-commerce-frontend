import React from 'react'

const CheckoutSummary = ({ items, subtotal, deliveryFee, total }) => {
  return (
    <div className="w-full lg:w-[380px] rounded-2xl border border-gray-200 p-5 sm:p-6 flex flex-col gap-4 shrink-0">
      <h2 className="text-lg font-bold">Order Summary</h2>

      <div className="flex flex-col gap-3 max-h-64 overflow-y-auto">
        {items.map((item, i) => (
          <div key={i} className="flex gap-3">
            <div className="w-14 h-14 bg-gray-100 rounded-lg overflow-hidden shrink-0">
              <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{item.name}</p>
              <p className="text-xs text-gray-500">
                {item.size} · Qty: {item.quantity}
              </p>
            </div>
            <span className="text-sm font-semibold shrink-0">
              ${item.price * item.quantity}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 flex flex-col gap-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Subtotal</span>
          <span className="font-bold">${subtotal}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Delivery Fee</span>
          <span className="font-bold">${deliveryFee}</span>
        </div>
        <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary