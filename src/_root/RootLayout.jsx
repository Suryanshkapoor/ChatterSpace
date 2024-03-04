import React from 'react'
import Topbar from '../components/Topbar'
import LeftSidebar from '../components/LeftSidebar'
import { Outlet } from 'react-router-dom'
import Bottombar from '../components/Bottombar'

const RootLayout = () => {
  return (
	<div className='w-full md:flex h-screen'>
    <Topbar/>
    <LeftSidebar/>
    <section className='flex flex-1 h-screen w-full bg-black text-white '>
      <Outlet/>
    </section>
    <Bottombar/>
  </div>
  )
}

export default RootLayout