import React, { useEffect, useState } from 'react'
import { BsBriefcase, BsPerson } from 'react-icons/bs'
import { FiMapPin } from 'react-icons/fi'
import Postcomponent from './Postcomponent'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from '@tanstack/react-query'

const Profile = () => {
    
    // Fetch function.
    const userName = Cookies.get("username")
    const access_token = Cookies.get("access_token")
    const refeshToken = Cookies.get("refresh_token")
    const headers = {
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${access_token}`,
        'Cookies': refeshToken,
    };
    const fetchProfile = async () => {
        console.log(userName)
        await axios.get(`https://backend-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/backend/${userName}/profile`, {headers})
                .then(res => {
                    console.log(res.data)
                    Cookies.set('access_token', response.data.access_token)
                    return res.data
                })
                .catch(err => console.log(err))
    }
    const query = useQuery({
        queryKey: ['profileFetch'], 
        queryFn: fetchProfile,
    })

    // console.log(query.data)

    // Example request
    const sampleRequestData = {
        user_details: {isgithub:true,
            username: "Titi",
            email: "titi@something.com",
            firstName: "Titi",
            lastName: "Lola",
            isverified: true,
            isredhat: false,
            islinkedin: false,
            isgoogle: false,
            profession: "Shoe Maker",
            lastLocation: "Not found",
            },
        "posts": "list of posts",
        "posts_count": "2",
        "is_follower": true,
        "follower_count": '2',
        "following_count": '3',
        "access_token": 'request.access_token'
    }


    const [swittcher, setSwittcher] = useState(false)


  return (
    <div className='text-2xl text-center pt-1 md:pt-5 '>
        <h2 className='border-b-2 pb-1 md:pb-3 text-lg md:text-xl font-semibold flex flex-row items-center  '><BsPerson className='ml-2 mr-1 '/>Profile</h2>
        <div className='bg-blue-400 h-[170px] relative '>
            <img src="../../public/pic1.png" className='absolute bottom-0 left-0 w-28 ml-2 mb-2 ' alt="" />
        </div>
        <div>
            <div className='flex flex-row gap-2 ml-3 mt-3 '>
                {/* <h2 className='font-semibold text-xl '>{query.data.user_details.username}</h2> */}
                {/* <h2 className='font-semibold text-xl '>{sampleRequestData.user_details.name} </h2> */}
                <h2 className='font-semibold text-xl '>Timi </h2>
                {/* <h2 className=' text-lg '>{sampleRequestData.user_details.username}</h2> */}
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