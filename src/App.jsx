import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from '@layout'
import { Home, Product,Category, Cart } from '@pages'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'product/:id', element: <Product /> },
      { path: 'category', element: <Category /> },
      { path: 'cart', element: <Cart /> },

    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App