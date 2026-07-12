import React from 'react'

const PaymentForm = ({ form, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Payment Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          name="cardNumber"
          value={form.cardNumber}
          onChange={onChange}
          placeholder="Card Number"
          maxLength={19}
          className="sm:col-span-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
        <input
          required
          name="expiry"
          value={form.expiry}
          onChange={onChange}
          placeholder="MM/YY"
          maxLength={5}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
        <input
          required
          name="cvv"
          value={form.cvv}
          onChange={onChange}
          placeholder="CVV"
          maxLength={4}
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
      </div>
    </div>
  )
}

export default PaymentForm