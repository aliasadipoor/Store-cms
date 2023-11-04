import { useState } from 'react'
import './App.css'
import Sidebar from './Components/Sidebar/Sidebar'
import Header from './Components/Headre/Header'
import { useRoutes } from 'react-router-dom'
import routs from '../routes'

function App() {
  let router = useRoutes(routs)
  return (
    <>
      <Sidebar />
      <div className="main">
        <Header />
        {router}
      </div>

    </>
  )
}

export default App
