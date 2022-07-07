import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../components/Footer/Footer'
import { NavBar } from '../components/NavBar/NavBar'

export const TemplatePage = () => {
  const location = useLocation()
  return (
    <>
      <NavBar />
      <Outlet />
      {location.pathname !== '/' ? <Footer /> : null}
    </>
  )
}
