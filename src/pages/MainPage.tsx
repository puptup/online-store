import React from 'react'
import { Outlet } from 'react-router-dom'

export const MainPage = () => {
  return (
    <div>
      <h1>MainPage</h1>
      <Outlet />
    </div>
  )
}
