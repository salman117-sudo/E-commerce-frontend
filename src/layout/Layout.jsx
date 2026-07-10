import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './navBar'
import Footer from './footer'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout