import Cookies from 'js-cookie'
import React from 'react'
import { useEffect } from 'react'
import {BiWinkSmile} from 'react-icons/bi'
import {FaRegSadTear} from 'react-icons/fa'
import { useParams } from 'react-router-dom'

const Emailconfirmation = () => {

    const userToken = useParams()
    const token  = Cookies.get("token")

    // useEffect(() => {
    //     console.log(token)
    //     console.log(userToken)
    //     if (token === userToken){

    //     }
    // })

  return (
    <div className='grid md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center '>
        <div className='bg-green grid place-content-center h-[80vh] md:h-[100vh]   '>
            <img src="../../public/logolargewhite.png" alt="" />
        </div>
        {
            userToken === token ?
            <div className='flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 '>
                <h1 className='text-4xl '>Email Confirmed ✔</h1>
                <BiWinkSmile size={180} color='#008080' />
            </div>
            :
            <div className='flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 '>
                <h1 className='text-4xl '>Awww Snap, an Error occoured</h1>
                <FaRegSadTear size={180} color='#008080' />
            </div>
        }
    </div>
  )
}

export default Emailconfirmation