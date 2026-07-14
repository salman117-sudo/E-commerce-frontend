import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import { z } from 'zod'
import { createPaymentIntent, confirmPayment } from '../../../services/paymentApi'
import useCartStore from '../../../store/useCartStore'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '15px',
      color: '#1f2937',
      fontFamily: 'inherit',
      fontSmoothing: 'antialiased',
      '::placeholder': { color: '#9ca3af' },
    },
    invalid: { color: '#ef4444', iconColor: '#ef4444' },
  },
}

const shippingSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(60, 'Name is too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter a valid street address'),
  city: z.string().min(2, 'Enter a valid city'),
})

const CheckoutForm = ({ items, total, subtotal, deliveryFee, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()

  const [clientSecret, setClientSecret] = useState('')
  const [orderId, setOrderId] = useState('')
  const [fetchingIntent, setFetchingIntent] = useState(true)
  const [loading, setLoading] = useState(false)
  const [globalError, setGlobalError] = useState('')

  const [fieldErrors, setFieldErrors] = useState({
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  })

  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    phone: false,
    address: false,
    city: false,
  })

  const [complete, setComplete] = useState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  })

  useEffect(() => {
    const init = async () => {
        console.log("Items being sent:", items);
      const result = await createPaymentIntent({ items, shipping: form, subtotal, deliveryFee, total })
      if (result.success) {
        setClientSecret(result.clientSecret)
        setOrderId(result.orderId)
      } else {
        setGlobalError('Could not initialize payment. Please try again.')
      }
      setFetchingIntent(false)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const result = shippingSchema.safeParse(form)
    if (result.success) {
      setFieldErrors((prev) => ({
        ...prev,
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
      }))
      return
    }
    const errors = result.error.flatten().fieldErrors
    setFieldErrors((prev) => ({
      ...prev,
      fullName: touched.fullName ? errors.fullName?.[0] ?? '' : '',
      email: touched.email ? errors.email?.[0] ?? '' : '',
      phone: touched.phone ? errors.phone?.[0] ?? '' : '',
      address: touched.address ? errors.address?.[0] ?? '' : '',
      city: touched.city ? errors.city?.[0] ?? '' : '',
    }))
  }, [form, touched])

  const handleCardChange = (field) => (e) => {
    setComplete((prev) => ({ ...prev, [field]: e.complete }))
    setFieldErrors((prev) => ({ ...prev, [field]: e.error?.message ?? '' }))
  }

  const handleBlur = (field) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  const shippingValid = shippingSchema.safeParse(form).success

  const isFormReady =
    shippingValid && complete.cardNumber && complete.cardExpiry && complete.cardCvc

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ fullName: true, email: true, phone: true, address: true, city: true })

    const result = shippingSchema.safeParse(form)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      setFieldErrors((prev) => ({
        ...prev,
        fullName: errors.fullName?.[0] ?? '',
        email: errors.email?.[0] ?? '',
        phone: errors.phone?.[0] ?? '',
        address: errors.address?.[0] ?? '',
        city: errors.city?.[0] ?? '',
      }))
      return
    }

    if (!stripe || !elements || !clientSecret) return

    setLoading(true)
    setGlobalError('')

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          address: { line1: form.address, city: form.city },
        },
      },
    })

    if (error) {
      setGlobalError(error.message)
      setLoading(false)
      return
    }

    if (paymentIntent?.status === 'succeeded') {
      await confirmPayment(orderId)
      onSuccess({ total, email: form.email })
    }

    setLoading(false)
  }

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20 transition placeholder-gray-400 ${
      fieldErrors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  const stripeBoxClass = (field) =>
    `border rounded-lg px-4 py-2.5 transition focus-within:ring-2 focus-within:ring-black/20 ${
      fieldErrors[field] ? 'border-red-400' : 'border-gray-200'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="border border-gray-100 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-gray-700 mb-3 tracking-wide uppercase">
          1. Shipping Details
        </h3>
        <div className="flex flex-col gap-3">
          <div>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              onBlur={handleBlur('fullName')}
              placeholder="Full Name"
              className={inputClass('fullName')}
            />
            {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
          </div>
          <div>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              onBlur={handleBlur('email')}
              placeholder="you@example.com"
              className={inputClass('email')}
            />
            {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              value={form.phone}
              onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              onBlur={handleBlur('phone')}
              placeholder="Phone Number"
              className={inputClass('phone')}
            />
            {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
                onBlur={handleBlur('address')}
                placeholder="Street Address"
                className={inputClass('address')}
              />
              {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
            </div>
            <div>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
                onBlur={handleBlur('city')}
                placeholder="City"
                className={inputClass('city')}
              />
              {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border border-gray-100 rounded-xl p-4">
        <h3 className="text-xs font-semibold text-gray-700 mb-3 tracking-wide uppercase">
          2. Payment Details
        </h3>

        <div className="flex flex-col gap-3">
          <div>
            <div className={stripeBoxClass('cardNumber')}>
              {fetchingIntent ? (
                <span className="text-gray-400 text-sm">Loading...</span>
              ) : (
                <CardNumberElement
                  options={{ ...ELEMENT_OPTIONS, placeholder: '1234 1234 1234 1234' }}
                  onChange={handleCardChange('cardNumber')}
                />
              )}
            </div>
            {fieldErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className={stripeBoxClass('cardExpiry')}>
                <CardExpiryElement
                  options={{ ...ELEMENT_OPTIONS, placeholder: 'MM / YY' }}
                  onChange={handleCardChange('cardExpiry')}
                />
              </div>
              {fieldErrors.cardExpiry && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardExpiry}</p>}
            </div>
            <div>
              <div className={stripeBoxClass('cardCvc')}>
                <CardCvcElement
                  options={{ ...ELEMENT_OPTIONS, placeholder: 'CVC' }}
                  onChange={handleCardChange('cardCvc')}
                />
              </div>
              {fieldErrors.cardCvc && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardCvc}</p>}
            </div>
          </div>
        </div>

        <p className="text-[11px] text-gray-400 mt-3">
          🔒 Bank-level encryption protects your payment info.
        </p>
      </div>

      {globalError && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
          {globalError}
        </div>
      )}

      <p className="text-[11px] text-gray-400 text-center">
        Test card: <span className="font-mono">4242 4242 4242 4242</span> · Any future date · Any CVC
      </p>

      <button
        type="submit"
        disabled={loading || fetchingIntent || !isFormReady || !stripe}
        className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-800"
      >
        {loading ? 'Processing...' : `Pay $${total}`}
      </button>
    </form>
  )
}

const StripeCheckoutModal = ({ items, subtotal, deliveryFee, total, onClose, isBuyNow }) => {
  const clearCart = useCartStore((s) => s.clearCart)
  const [paymentDone, setPaymentDone] = useState(false)
  const [paidInfo, setPaidInfo] = useState(null)

  const handleSuccess = (info) => {
    setPaidInfo(info)
    setPaymentDone(true)
    if (!isBuyNow) clearCart()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">

        {!paymentDone ? (
          <>
            {/* LEFT: order info — fixed, no scroll */}
            <div className="w-full md:w-[320px] shrink-0 bg-gray-50 p-6 flex flex-col gap-5 md:rounded-l-3xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Complete Purchase</h2>
                  <p className="text-gray-400 text-xs mt-0.5">Secure payment powered by Stripe</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition md:hidden">
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto scrollbar-width:none [&::-webkit-scrollbar]:hidden">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between items-center gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg bg-white border border-gray-200 shrink-0"
                      />
                      <span className="text-gray-700 font-medium text-sm truncate">
                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                    </div>
                    <span className="text-gray-900 font-bold text-sm shrink-0">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 mt-auto">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery Fee</span>
                  <span>${deliveryFee}</span>
                </div>
                <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>

            {/* RIGHT: form — scrollable, scrollbar hidden */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar-width:none [&::-webkit-scrollbar]:hidden">
              <div className="hidden md:flex items-center justify-end mb-2">
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
                  ✕
                </button>
              </div>

              <Elements stripe={stripePromise}>
                <CheckoutForm
                  items={items}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  total={total}
                  onSuccess={handleSuccess}
                />
              </Elements>
            </div>
          </>
        ) : (
          <div className="p-10 text-center w-full flex flex-col items-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-5 animate-[scaleIn_0.3s_ease-out]">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Thank You!
            </h2>
            <p className="text-gray-500 text-sm mb-8 max-w-xs">
              Your payment was successful. A confirmation has been sent to your email.
            </p>

            <div className="bg-gray-50 rounded-2xl p-5 text-left w-full max-w-sm mb-8 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-bold text-gray-900">${paidInfo.total}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Sent To</span>
                <span className="font-semibold text-gray-800">{paidInfo.email}</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-gray-200">
                <span className="text-gray-500">Status</span>
                <span className="font-semibold text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-green-500" /> Paid
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full max-w-sm bg-black text-white py-3.5 rounded-full font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default StripeCheckoutModal

// import { useState, useEffect } from 'react'
// import { loadStripe } from '@stripe/stripe-js'
// import {
//   Elements,
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement,
//   useStripe,
//   useElements,
// } from '@stripe/react-stripe-js'
// import { z } from 'zod'
// import { createPaymentIntent, confirmPayment } from '../../../services/paymentApi'
// import useCartStore from '../../../store/useCartStore'

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

// const ELEMENT_OPTIONS = {
//   style: {
//     base: {
//       fontSize: '15px',
//       color: '#1f2937',
//       fontFamily: 'inherit',
//       fontSmoothing: 'antialiased',
//       '::placeholder': { color: '#9ca3af' },
//     },
//     invalid: { color: '#ef4444', iconColor: '#ef4444' },
//   },
// }

// const shippingSchema = z.object({
//   fullName: z
//     .string()
//     .min(2, 'Name must be at least 2 characters')
//     .max(60, 'Name is too long')
//     .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters'),
//   email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
//   phone: z.string().min(7, 'Enter a valid phone number'),
//   address: z.string().min(5, 'Enter a valid street address'),
//   city: z.string().min(2, 'Enter a valid city'),
// })

// const CheckoutForm = ({ items, total, subtotal, deliveryFee, onSuccess }) => {
//   const stripe = useStripe()
//   const elements = useElements()

//   const [clientSecret, setClientSecret] = useState('')
//   const [orderId, setOrderId] = useState('')
//   const [fetchingIntent, setFetchingIntent] = useState(true)
//   const [loading, setLoading] = useState(false)
//   const [globalError, setGlobalError] = useState('')

//   const [fieldErrors, setFieldErrors] = useState({
//     cardNumber: '',
//     cardExpiry: '',
//     cardCvc: '',
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//   })

//   const [form, setForm] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     address: '',
//     city: '',
//   })

//   const [touched, setTouched] = useState({
//     fullName: false,
//     email: false,
//     phone: false,
//     address: false,
//     city: false,
//   })

//   const [complete, setComplete] = useState({
//     cardNumber: false,
//     cardExpiry: false,
//     cardCvc: false,
//   })

//   useEffect(() => {
//     const init = async () => {
//       const result = await createPaymentIntent({ items, shipping: form, subtotal, deliveryFee, total })
//       if (result.success) {
//         setClientSecret(result.clientSecret)
//         setOrderId(result.orderId)
//       } else {
//         setGlobalError('Could not initialize payment. Please try again.')
//       }
//       setFetchingIntent(false)
//     }
//     init()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   useEffect(() => {
//     const result = shippingSchema.safeParse(form)
//     if (result.success) {
//       setFieldErrors((prev) => ({
//         ...prev,
//         fullName: '',
//         email: '',
//         phone: '',
//         address: '',
//         city: '',
//       }))
//       return
//     }
//     const errors = result.error.flatten().fieldErrors
//     setFieldErrors((prev) => ({
//       ...prev,
//       fullName: touched.fullName ? errors.fullName?.[0] ?? '' : '',
//       email: touched.email ? errors.email?.[0] ?? '' : '',
//       phone: touched.phone ? errors.phone?.[0] ?? '' : '',
//       address: touched.address ? errors.address?.[0] ?? '' : '',
//       city: touched.city ? errors.city?.[0] ?? '' : '',
//     }))
//   }, [form, touched])

//   const handleCardChange = (field) => (e) => {
//     setComplete((prev) => ({ ...prev, [field]: e.complete }))
//     setFieldErrors((prev) => ({ ...prev, [field]: e.error?.message ?? '' }))
//   }

//   const handleBlur = (field) => () => {
//     setTouched((prev) => ({ ...prev, [field]: true }))
//   }

//   const shippingValid = shippingSchema.safeParse(form).success

//   const isFormReady =
//     shippingValid && complete.cardNumber && complete.cardExpiry && complete.cardCvc

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setTouched({ fullName: true, email: true, phone: true, address: true, city: true })

//     const result = shippingSchema.safeParse(form)
//     if (!result.success) {
//       const errors = result.error.flatten().fieldErrors
//       setFieldErrors((prev) => ({
//         ...prev,
//         fullName: errors.fullName?.[0] ?? '',
//         email: errors.email?.[0] ?? '',
//         phone: errors.phone?.[0] ?? '',
//         address: errors.address?.[0] ?? '',
//         city: errors.city?.[0] ?? '',
//       }))
//       return
//     }

//     if (!stripe || !elements || !clientSecret) return

//     setLoading(true)
//     setGlobalError('')

//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements.getElement(CardNumberElement),
//         billing_details: {
//           name: form.fullName,
//           email: form.email,
//           phone: form.phone,
//           address: { line1: form.address, city: form.city },
//         },
//       },
//     })

//     if (error) {
//       setGlobalError(error.message)
//       setLoading(false)
//       return
//     }

//     if (paymentIntent?.status === 'succeeded') {
//       await confirmPayment(orderId)
//       onSuccess({ total, email: form.email })
//     }

//     setLoading(false)
//   }

//   const inputClass = (field) =>
//     `w-full border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-black/20 transition placeholder-gray-400 ${
//       fieldErrors[field] ? 'border-red-400' : 'border-gray-200'
//     }`

//   const stripeBoxClass = (field) =>
//     `border rounded-lg px-4 py-2.5 transition focus-within:ring-2 focus-within:ring-black/20 ${
//       fieldErrors[field] ? 'border-red-400' : 'border-gray-200'
//     }`

//   return (
//     <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
//       <div className="border border-gray-100 rounded-xl p-4">
//         <h3 className="text-xs font-semibold text-gray-700 mb-3 tracking-wide uppercase">
//           1. Shipping Details
//         </h3>
//         <div className="flex flex-col gap-3">
//           <div>
//             <input
//               type="text"
//               value={form.fullName}
//               onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
//               onBlur={handleBlur('fullName')}
//               placeholder="Full Name"
//               className={inputClass('fullName')}
//             />
//             {fieldErrors.fullName && <p className="text-red-500 text-xs mt-1">{fieldErrors.fullName}</p>}
//           </div>
//           <div>
//             <input
//               type="email"
//               value={form.email}
//               onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
//               onBlur={handleBlur('email')}
//               placeholder="you@example.com"
//               className={inputClass('email')}
//             />
//             {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
//           </div>
//           <div>
//             <input
//               type="text"
//               value={form.phone}
//               onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
//               onBlur={handleBlur('phone')}
//               placeholder="Phone Number"
//               className={inputClass('phone')}
//             />
//             {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
//           </div>
//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <input
//                 type="text"
//                 value={form.address}
//                 onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
//                 onBlur={handleBlur('address')}
//                 placeholder="Street Address"
//                 className={inputClass('address')}
//               />
//               {fieldErrors.address && <p className="text-red-500 text-xs mt-1">{fieldErrors.address}</p>}
//             </div>
//             <div>
//               <input
//                 type="text"
//                 value={form.city}
//                 onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
//                 onBlur={handleBlur('city')}
//                 placeholder="City"
//                 className={inputClass('city')}
//               />
//               {fieldErrors.city && <p className="text-red-500 text-xs mt-1">{fieldErrors.city}</p>}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="border border-gray-100 rounded-xl p-4">
//         <div className="flex items-center justify-between mb-3">
//           <h3 className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
//             2. Payment Details
//           </h3>
//         </div>

//         <div className="flex flex-col gap-3">
//           <div>
//             <div className={stripeBoxClass('cardNumber')}>
//               {fetchingIntent ? (
//                 <span className="text-gray-400 text-sm">Loading...</span>
//               ) : (
//                 <CardNumberElement
//                   options={{ ...ELEMENT_OPTIONS, placeholder: '1234 1234 1234 1234' }}
//                   onChange={handleCardChange('cardNumber')}
//                 />
//               )}
//             </div>
//             {fieldErrors.cardNumber && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardNumber}</p>}
//           </div>

//           <div className="grid grid-cols-2 gap-3">
//             <div>
//               <div className={stripeBoxClass('cardExpiry')}>
//                 <CardExpiryElement
//                   options={{ ...ELEMENT_OPTIONS, placeholder: 'MM / YY' }}
//                   onChange={handleCardChange('cardExpiry')}
//                 />
//               </div>
//               {fieldErrors.cardExpiry && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardExpiry}</p>}
//             </div>
//             <div>
//               <div className={stripeBoxClass('cardCvc')}>
//                 <CardCvcElement
//                   options={{ ...ELEMENT_OPTIONS, placeholder: 'CVC' }}
//                   onChange={handleCardChange('cardCvc')}
//                 />
//               </div>
//               {fieldErrors.cardCvc && <p className="text-red-500 text-xs mt-1">{fieldErrors.cardCvc}</p>}
//             </div>
//           </div>
//         </div>

//         <p className="text-[11px] text-gray-400 mt-3">
//           🔒 Bank-level encryption protects your payment info.
//         </p>
//       </div>

//       {globalError && (
//         <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
//           {globalError}
//         </div>
//       )}

//       <p className="text-[11px] text-gray-400 text-center">
//         Test card: <span className="font-mono">4242 4242 4242 4242</span> · Any future date · Any CVC
//       </p>

//       <button
//         type="submit"
//         disabled={loading || fetchingIntent || !isFormReady || !stripe}
//         className="w-full bg-black text-white py-3.5 rounded-full font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed transition hover:bg-gray-800"
//       >
//         {loading ? 'Processing...' : `Pay $${total}`}
//       </button>
//     </form>
//   )
// }

// const StripeCheckoutModal = ({ items, subtotal, deliveryFee, total, onClose, isBuyNow }) => {
//   const clearCart = useCartStore((s) => s.clearCart)
//   const [paymentDone, setPaymentDone] = useState(false)
//   const [paidInfo, setPaidInfo] = useState(null)

//   const handleSuccess = (info) => {
//     setPaidInfo(info)
//     setPaymentDone(true)
//     if (!isBuyNow) clearCart()
//   }

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6"
//       onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
//     >
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">

//         {!paymentDone ? (
//           <>
//             {/* LEFT: order info — fixed, no scroll */}
//             <div className="w-full md:w-[320px] shrink-0 bg-gray-50 p-6 flex flex-col gap-5 md:rounded-l-3xl">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h2 className="text-lg font-bold text-gray-900">Complete Purchase</h2>
//                   <p className="text-gray-400 text-xs mt-0.5">Secure payment powered by Stripe</p>
//                 </div>
//                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition md:hidden">
//                   ✕
//                 </button>
//               </div>

//               <div className="flex flex-col gap-3 overflow-y-auto scrollbar-width:none [&::-webkit-scrollbar]:hidden">
//                 {items.map((item, i) => (
//                   <div key={i} className="flex justify-between items-center gap-3">
//                     <div className="flex items-center gap-3 min-w-0">
//                       <img
//                         src={item.img}
//                         alt={item.name}
//                         className="w-12 h-12 object-cover rounded-lg bg-white border border-gray-200 shrink-0"
//                       />
//                       <span className="text-gray-700 font-medium text-sm truncate">
//                         {item.name} <span className="text-gray-400">x{item.quantity}</span>
//                       </span>
//                     </div>
//                     <span className="text-gray-900 font-bold text-sm shrink-0">
//                       ${item.price * item.quantity}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="flex flex-col gap-2 pt-4 border-t border-gray-200 mt-auto">
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Subtotal</span>
//                   <span>${subtotal}</span>
//                 </div>
//                 <div className="flex justify-between text-sm text-gray-500">
//                   <span>Delivery Fee</span>
//                   <span>${deliveryFee}</span>
//                 </div>
//                 <div className="flex justify-between text-base font-bold pt-2 border-t border-gray-200">
//                   <span>Total</span>
//                   <span>${total}</span>
//                 </div>
//               </div>
//             </div>

//             {/* RIGHT: form — scrollable, scrollbar hidden */}
//             <div className="flex-1 p-6 overflow-y-auto scrollbar-width:none [&::-webkit-scrollbar]:hidden">
//               <div className="hidden md:flex items-center justify-end mb-2">
//                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
//                   ✕
//                 </button>
//               </div>

//               <Elements stripe={stripePromise}>
//                 <CheckoutForm
//                   items={items}
//                   subtotal={subtotal}
//                   deliveryFee={deliveryFee}
//                   total={total}
//                   onSuccess={handleSuccess}
//                 />
//               </Elements>
//             </div>
//           </>
//         ) : (
//           <div className="p-8 text-center w-full">
//             <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//               <span className="text-green-500 text-3xl">✓</span>
//             </div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-1">Payment Successful!</h2>
//             <p className="text-gray-400 text-sm mb-6">
//               Thank you — a confirmation has been sent to your email.
//             </p>
//             <div className="bg-gray-50 rounded-xl p-4 text-left space-y-3 mb-6 max-w-sm mx-auto">
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Amount paid</span>
//                 <span className="font-semibold text-gray-800">${paidInfo.total}</span>
//               </div>
//               <div className="flex justify-between text-sm">
//                 <span className="text-gray-500">Sent to</span>
//                 <span className="font-semibold text-gray-800">{paidInfo.email}</span>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="w-full max-w-sm mx-auto block bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition"
//             >
//               Done
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default StripeCheckoutModal