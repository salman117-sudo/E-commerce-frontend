import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      loginSuccess: (token, user) => {
        set({ token, user, isLoggedIn: true })
      },

      logout: () => {
        set({ token: null, user: null, isLoggedIn: false })
      },
    }),
    { name: 'shopco_auth' }
  )
)

export default useAuthStore