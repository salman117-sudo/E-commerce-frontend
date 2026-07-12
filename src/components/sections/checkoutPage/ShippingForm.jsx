import React from 'react'

const ShippingForm = ({ form, onChange }) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold">Shipping Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          required
          name="fullName"
          value={form.fullName}
          onChange={onChange}
          placeholder="Full Name"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
        <input
          required
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="Phone Number"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
        <input
          required
          name="address"
          value={form.address}
          onChange={onChange}
          placeholder="Street Address"
          className="sm:col-span-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
        <input
          required
          name="city"
          value={form.city}
          onChange={onChange}
          placeholder="City"
          className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-black"
        />
      </div>
    </div>
  )
}

export default ShippingForm