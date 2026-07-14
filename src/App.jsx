import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@layout'
import { Home, Product, Category, Cart, Checkout, Signup, Login } from '@pages'
import ProtectedRoute from '@/components/ProtectedRoute'

const router = createBrowserRouter([
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'category', element: <Category /> },
      { path: 'cart', element: <Cart /> },
      { path: 'checkout', element: <Checkout /> },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App