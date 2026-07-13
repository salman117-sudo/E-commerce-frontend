import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addItem: (product, size, color, quantity) => {
        const cart = get().cart
        const existingIndex = cart.findIndex(
          (item) => item.id === product.id && item.size === size && item.color === color
        )

        if (existingIndex > -1) {
          const updated = [...cart]
          updated[existingIndex].quantity += quantity
          set({ cart: updated })
        } else {
          set({
            cart: [
              ...cart,
              {
                cartItemId: `${product.id}-${size}-${color}-${Date.now()}`,
                id: product.id,
                name: product.name,
                img: product.img,
                price: product.price,
                oldPrice: product.oldPrice,
                discount: product.discount,
                size,
                color,
                quantity,
              },
            ],
          })
        }
      },

      updateQuantity: (cartItemId, quantity) => {
        set({
          cart: get().cart.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })
      },

      removeItem: (cartItemId) => {
        set({ cart: get().cart.filter((item) => item.cartItemId !== cartItemId) })
      },

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'shopco_cart' }
  )
)

export default useCartStore