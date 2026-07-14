import { Navigate } from 'react-router-dom'
import useAuthStore from '@/store/useAuthStore'

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)

  if (!isLoggedIn) {
    return <Navigate to="/signup" replace />
  }

  return children
}

export default ProtectedRoute