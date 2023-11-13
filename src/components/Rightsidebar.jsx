import React from 'react'
import Menu from './Menu'
import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Rightsidebar = () => {
  return (
    <div className=' border-l-2 border-graylight hidden md:block pt-5 '>
        {/* Search btn */}
        <div className='  md:pl-6 '>
            <input className='bg-graylight p-1 md:p-2 border-2 border-graydark rounded-full text-graydark ' type="text" placeholder='🔍Search' />
        </div>
        <Communityselector />
        <Popularaccounts />
    </div>
  )
}

export default Rightsidebar