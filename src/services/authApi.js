const BASE_URL = import.meta.env.VITE_API_URL
const AUTH_URL = `${BASE_URL}/api/auth`

const handleResponse = async (response) => {
  const data = await response.json()
  if (!response.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const registerUser = async ({ name, email, password }) => {
  try {
    const response = await fetch(`${AUTH_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await handleResponse(response)
    return { success: true, userId: data.userId, email: data.email }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const verifyCode = async ({ userId, code }) => {
  try {
    const response = await fetch(`${AUTH_URL}/verify-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, code }),
    })
    const data = await handleResponse(response)
    return { success: true, token: data.token, user: data.user }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const resendCode = async ({ userId }) => {
  try {
    const response = await fetch(`${AUTH_URL}/resend-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    const data = await handleResponse(response)
    return { success: true, message: data.message }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${AUTH_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await handleResponse(response)
    return { success: true, token: data.token, user: data.user }
  } catch (error) {
    return { success: false, message: error.message }
  }
}