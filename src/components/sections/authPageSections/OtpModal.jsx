import { useState, useEffect, useRef } from 'react'
import { verifyCode, resendCode } from '@/services/authApi'

const OtpModal = ({ userId, email, onClose, onVerified }) => {
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [timeLeft, setTimeLeft] = useState(300)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const inputRefs = useRef([])

  useEffect(() => {
    if (timeLeft <= 0) return
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearInterval(timer)
  }, [timeLeft])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60
  const isExpired = timeLeft <= 0

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    setError('')
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setCode(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleVerify = async () => {
    const codeValue = code.join('')
    if (codeValue.length !== 6) {
      setError('Please enter all 6 digits')
      return
    }
    if (isExpired) {
      setError('Code has expired. Please resend.')
      return
    }

    setLoading(true)
    setError('')

    const result = await verifyCode({ userId, code: codeValue })

    if (result.success) {
      onVerified(result.token, result.user)
    } else {
      setError(result.message)
    }

    setLoading(false)
  }

  const handleResend = async () => {
    setResending(true)
    setError('')

    const result = await resendCode({ userId })

    if (result.success) {
      setTimeLeft(300)
      setCode(['', '', '', '', '', ''])
      inputRefs.current[0]?.focus()
    } else {
      setError(result.message)
    }

    setResending(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 transition"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Verify Your Email</h2>
          <p className="text-gray-500 text-sm">
            We sent a 6-digit code to <span className="font-medium text-gray-700">{email}</span>
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
          {code.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-12 h-14 text-center text-xl font-bold border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-black/20 focus:border-black"
            />
          ))}
        </div>

        <div className="text-center mb-4">
          {!isExpired ? (
            <p className="text-sm text-gray-500">
              Code expires in{' '}
              <span className="font-semibold text-gray-800">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
            </p>
          ) : (
            <p className="text-sm text-red-500 font-medium">Your code has expired</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5 mb-4 text-center">
            {error}
          </div>
        )}

        <button
          onClick={handleVerify}
          disabled={loading || isExpired}
          className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed mb-3"
        >
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </button>

        <button
          onClick={handleResend}
          disabled={resending}
          className="w-full text-center text-sm text-gray-500 hover:text-black transition disabled:opacity-40"
        >
          {resending ? 'Resending...' : "Didn't receive the code? Resend"}
        </button>
      </div>
    </div>
  )
}

export default OtpModal;