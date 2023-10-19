import React from 'react'
import {BsPerson, BsBookmark, BsRobot, BsPeople} from 'react-icons/bs'

const Menu = () => {
  return (
    <div className='flex flex-col px-6'>
        {/* Menu */}
        <div className='list-none text-base md:text-xl font-semibold flex flex-col gap-0 md:gap-2 pt-10 mb-10 w-min '>
            <li className='flex items-center rounded-full p-2  hover:bg-graydark '><BsPeople className='mr-1'/>Community</li>
            <li className='flex items-center rounded-full p-2  hover:bg-graydark'><BsRobot className='mr-1'/>Waver X</li>
            <li className='flex items-center rounded-full p-2  hover:bg-graydark'><BsPerson className='mr-1'/>Profile</li>
            <li className='flex items-center rounded-full p-2  hover:bg-graydark'><BsBookmark className='mr-1'/>Bookmark</li>
        </div>
        {/* Post btn */}
        <button className='text-xl font-semibold bg-green text-white p-4 rounded-full'>Post</button>
        
    </div>
  )
}

export default Menu