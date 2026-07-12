import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@layout'
import { Home, Product, Category, Cart, Checkout } from '@pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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