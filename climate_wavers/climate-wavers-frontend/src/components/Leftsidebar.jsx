import React from 'react'
import Menu from './menu'

const Leftsidebar = () => {
  return (
    <div className=' border-r-2 border-graylight hidden md:block pt-5 '>
      {/* Logo */}
          <div className=' justify-self-center md:justify-self-start '>
            <img src='../../public/logo.png'/>
        </div>
        <Menu/>
        {/* Name box */}
        <div className='flex flex-row items-center my-6 self-center '>
            {/* Img here */}
            <img src='../../public/pic1.png' className='mr-2'/>
            <div>
                <h3>Titi Simon</h3>
                <p>@titisimon21</p>
            </div>
        </div>
    </div>
  )
}

export default Leftsidebar