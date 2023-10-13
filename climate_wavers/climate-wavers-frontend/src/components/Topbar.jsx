import React from 'react'
import Padder from './Padder'

const Topbar = () => {
  return (
    // <Padder >  flex flex-row
    <div className=' grid md:grid-cols-[1fr_2fr_1fr]  items-center outline outline-1 outline-graylight px-3 py-2 md:px-20 md:py-4 '>
        {/* Logo */}
        <div className=' justify-self-center '>
            <img src='../../public/logo.png'/>
        </div>
        {/* Page title */}
        <div className=' md:border-r-2 md:border-l-2 md:px-3 border-graydark text-lg font-semibold  '>
            Community
        </div>
        {/* Search btn */}
        <div className='  md:pl-6 '>
            <input className='bg-graylight p-1 md:p-2 border-2 border-graydark rounded-full text-graydark ' type="text" placeholder='🔍Search' />
        </div>
    </div>
    // </Padder>
  )
}

export default Topbar