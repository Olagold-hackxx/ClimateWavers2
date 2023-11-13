import React, { useState } from 'react'
import { BsBriefcase, BsPerson } from 'react-icons/bs'
import { FiMapPin } from 'react-icons/fi'
import Postcomponent from './Postcomponent'

const Profile = () => {

    const [swittcher, setSwittcher] = useState(false)


  return (
    <div className='text-2xl text-center pt-1 md:pt-5 '>
        <h2 className='border-b-2 pb-1 md:pb-3 text-lg md:text-xl font-semibold flex flex-row items-center  '><BsPerson className='ml-2 mr-1 '/>Profile</h2>
        <div className='bg-blue-400 h-[170px] relative '>
            <img src="../../public/pic1.png" className='absolute bottom-0 left-0 w-28 ml-2 mb-2 ' alt="" />
        </div>
        <div>
            <div className='flex flex-row gap-2 ml-3 mt-3 '>
                <h2 className='font-semibold text-xl '>Titi Simon</h2>
                <h2 className=' text-lg '>@titisimon21</h2>
            </div>
            <p className=' font-normal text-left ml-2 text-base my-2 '>A dedicated climate analyst with a background in environmental science</p>
            <div className='font-normal text-left text-gray-600 ml-2 text-base my-4 flex flex-row items-center gap-5   '>
                <p className='flex flex-row items-center gap-1 '><FiMapPin size={17} />Nigeria</p>
                <p className='flex flex-row items-center gap-1'><BsBriefcase size={17} />Climate Analyst</p>
            </div>
        </div>
        {/* Post Swittcher */}
        <div>
            <div className='text-gray-400 flex flex-row justify-center text-base gap-8 border-0 border-b-2 '>
                <h2 className={`cursor-pointer ${swittcher === false ? 'text-black border-b-2 border-black' : null } `} onClick={() => setSwittcher(!swittcher)} >My posts</h2>
                <h2 className={`cursor-pointer ${swittcher === true ? 'text-black border-b-2 border-black' : null } `} onClick={() => setSwittcher(!swittcher)} >Community</h2>
            </div>
            <Postcomponent/>
        </div>
    </div>
  )
}

export default Profile