import React, { useState } from 'react'
import Accountcard from './Accountcard'
import { AiOutlineHeart, AiOutlineRetweet } from 'react-icons/ai'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { PiBookmarkSimple } from 'react-icons/pi'
import { TbLineDashed } from 'react-icons/tb'

const Postcomponent = () => {


  return (
    <div className=' py-3 border-b-2'>
        <Accountcard />
        <p className='text-left text-sm px-3 my-3 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa dicta eligendi repellat explicabo debitis eos, totam fugit sit, ad perspiciatis vitae magni placeat perferendis! Reprehenderit natus ipsam alias non sapiente.</p>
        <img className='w-[100%] px-3 ' src="../../public/postpic.png" alt="" />
        <div className='flex flex-row justify-between px-3 mt-2 ' >
            <div className='flex flex-row items-center  '>
                <AiOutlineHeart size={18} />
                <p className='text-xs ml-1 '>2</p>
            </div>
            <div className='flex flex-row items-center  '>
                <AiOutlineRetweet size={18} />
                <p className='text-xs ml-1 '>2</p>
            </div>
            <div className='flex flex-row items-center  '>
                <HiOutlineChatBubbleOvalLeft size={18} />
                <p className='text-xs ml-1 '>2</p>
            </div>
            <div className='flex flex-row items-center  '>
                <PiBookmarkSimple size={18} />
                {/* <p className='text-xs ml-1 '>2</p> */}
            </div>
            <div className='flex flex-row items-center  '>
                <TbLineDashed size={18} />
                {/* <p className='text-xs ml-1 '>2</p> */}
            </div>
        </div>
    </div>
  )
}

export default Postcomponent