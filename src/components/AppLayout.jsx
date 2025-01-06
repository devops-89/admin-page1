import React from 'react'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <>
        <Navbar/>
        <Outlet/>
        <Sidebar/>
    </>
  )
}

export default AppLayout