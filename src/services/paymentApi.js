const BASE_URL = import.meta.env.VITE_API_URL
const PAYMENT_URL = `${BASE_URL}/api/payments`

const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong')
  }
  return data
}

// Step 1: create PaymentIntent + save a 'pending' order in DB
export const createPaymentIntent = async ({ items, shipping, subtotal, deliveryFee, total }) => {
  try {
    const response = await fetch(`${PAYMENT_URL}/create-intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, shipping, subtotal, deliveryFee, total }),
    })
    const data = await handleResponse(response)
    return { success: true, clientSecret: data.clientSecret, orderId: data.orderId }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Step 2: tell backend payment succeeded → mark order as 'paid'
export const confirmPayment = async (orderId) => {
  try {
    const response = await fetch(`${PAYMENT_URL}/confirm/${orderId}`, {
      method: 'POST',
    })
    const data = await handleResponse(response)
    return { success: true, data }
  } catch (error) {
    return { success: false, message: error.message }
  }
}