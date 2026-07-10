 import React, { createContext, useContext, useReducer, useEffect } from 'react'

const CartContext = createContext()

const STORAGE_KEY = 'shopco_cart'

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, size, color, quantity } = action.payload
      // treat same product+size+color as the same line item
      const existingIndex = state.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === size &&
          item.color === color
      )

      if (existingIndex > -1) {
        const updated = [...state]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }

      return [
        ...state,
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
      ]
    }

    case 'UPDATE_QUANTITY': {
      return state.map((item) =>
        item.cartItemId === action.payload.cartItemId
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
    }

    case 'REMOVE_ITEM':
      return state.filter((item) => item.cartItemId !== action.payload.cartItemId)

    case 'CLEAR_CART':
      return []

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], loadCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addItem = (product, size, color, quantity) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, size, color, quantity } })
  }

  const updateQuantity = (cartItemId, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { cartItemId, quantity } })
  }

  const removeItem = (cartItemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { cartItemId } })
  }

  const clearCart = () => dispatch({ type: 'CLEAR_CART' })

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ cart, addItem, updateQuantity, removeItem, clearCart, itemCount }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}