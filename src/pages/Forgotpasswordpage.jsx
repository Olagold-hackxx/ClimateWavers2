import React from 'react'
import Forgotpassword from '../components/Forgotpassword'

const Forgotpasswordpage = () => {


    return (
        <div className='grid md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center '>
            <div className='bg-green grid place-content-center h-[80vh] md:h-[100vh]   '>
                <img src="../../logo/logolargewhite.png" alt="" />
            </div>
            <div className='flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 '>
            <>
                <h1 className='text-2xl font-semibold mb-3 mt-8 md:mt-0 '>Forgot password</h1>
                <Forgotpassword />
            </>
            </div>
        </div>
      )
    }

export default Forgotpasswordpage