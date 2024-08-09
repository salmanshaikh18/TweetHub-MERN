import React from 'react'
import Home from './pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Routing from './Routing'
import Layout from './Layout'

const App = () => {
  return (
    <div className='bg-slate-900 h-screen sm:min-h-screen w-full text-zinc-200'>
      <Routing />
    </div>
  )
}

export default App