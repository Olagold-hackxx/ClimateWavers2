import React from 'react'
import Topbar from './Topbar'
import Leftsidebar from './Leftsidebar'
import Mainfeed from './Mainfeed'
import Rightsidebar from './Rightsidebar'
import { Outlet } from 'react-router-dom'

const SharedLayout = () => {
  return (
    <div>
      <div className=' block md:hidden '><Topbar/></div>
      <div className='grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-3 md:px-20 '>
        <Leftsidebar />
        {/* <Mainfeed/> */}
        <Outlet />
        <Rightsidebar />
      </div>
    </div>
  )
}

export default SharedLayout