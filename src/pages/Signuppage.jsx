import { useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import {ImTwitter} from 'react-icons/im'
import {FaFacebook} from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Signupform from '../components/Signupform'
import { AiOutlineClose } from 'react-icons/ai'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'

const Signuppage = () => {

    const googleSigninFunction = () => {
        console.log("The icon has been clicked")
        axios.get("https://oauth-olagoldhackxx-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/auth/new-google")
    }

    const userId = Cookies.get("userId")
    const resendEmailFn = () => {
        axios.get(`https://backend-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/backend/${userId}/verify`)
            .then((response) => console.log(response))
            .then((error) => console.log(error))
    }

    const handleResendEmail = () => {
        toast.promise(
            resendEmailFn, 
            {
              pending: 'Resending Mail...',
              success: 'Succesful 👌 Please re-Check your email',
              error: 'An Error occured 🤯'
            }
        )
    }

    const [isFormOpen, setIsFormOpen] = useState(false)


  return (
    <>
    <div className='grid md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center '>
        <div className='bg-green grid place-content-center h-[80vh] md:h-[100vh]   '>
            <img src="../../public/logolargewhite.png" alt="" />
        </div>
        <div className='flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 '>
            {
                isFormOpen === false ? 
                <>
                <h1 className='text-2xl font-semibold mb-3 mt-8 md:mt-0 '>Sign up</h1>
                <a href="https://oauth-olagoldhackxx-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/v1/auth/new-google">
                <div 
                className='flex flex-row mb-3 items-center md:text-xl text-base  font-semibold outline outline-1 bg-white text-black p-4 rounded-full '
                // onClick={() => googleSigninFunction()}
                ><FcGoogle className='mr-2 ' size={32} /> Continue in with Google</div></a>
                <div className='flex flex-row gap-3 w-[100%] justify-center bg-white py-3 '>
                    <a href='https://oauth-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/auth/titter'><img className='w-[35px]' src="../../public/2.png" alt="" /></a>
                    <a href='https://oauth-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/auth/facebook' ><img className='w-[35px]' src="../../public/3.png" alt="" /></a>
                    <a href='https://oauth-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/auth/redhat-sso' ><img className='w-[35px]' src="../../public/4.png" alt="" /></a>
                    <a href='https://oauth-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/auth/linkedin' ><img className='w-[35px]' src="../../public/5.png" alt="" /></a>
                </div>
                <p>or</p>
                <button className='md:text-xl text-base font-semibold bg-green text-white p-4 rounded-full w-[50%] ' onClick={() => setIsFormOpen(true)}  >Sign Up</button>
                <p>Already have an account? <Link to={'/login'} className='underline text-green'>Sign in</Link> </p>
                </>
                :
                <div className='bg-slate-200 max-w-md mx-auto p-3 md:p-6 rounded-md shadow-md flex flex-col '>
                    <AiOutlineClose className='mb-3' size={28} onClick={() => setIsFormOpen(false)} />
                    <Signupform />
                </div>
            }
            
            {
            isFormOpen === true ?
            <button 
            onClick={() => handleResendEmail()}
            className='w-[20%] p-2 bg-green text-white rounded cursor-pointer z-10 absolute -bottom-[100px] right-2 '
            >
                Resend email
            </button>
            : null
        }
            
        </div>
        
    </div>
    </>
  )
}

export default Signuppage