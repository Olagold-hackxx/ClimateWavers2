import React from 'react'
import { Link } from 'react-router-dom'

const Communityselector = () => {
  return (
    <div className='flex flex-col gap-2 bg-graylight list-none py-4 m-4 rounded-2xl '>

        <Link to={'/'} ><li className='hover:bg-graydark p-2' >Community</li></Link>
        <Link to={'/education'}  ><li className='hover:bg-graydark p-2' >Education </li></Link>
        <li className='hover:bg-graydark p-2' >Happening now</li>
        <li className='hover:bg-graydark p-2' >Disaster</li>
        <li className='hover:bg-graydark p-2' >AI analysis</li>
    </div>
  )
}

export default Communityselector