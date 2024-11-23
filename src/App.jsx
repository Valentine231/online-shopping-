import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'

const App = () => {
  return (
    <div className='bg-blue-500 min-h-screen'>
      <Navbar />
      <main>
      <Outlet />
      </main>
      
    </div>
  )
}

export default App