import React from 'react'
import Menu from './Menu'
import Rightsidebar from './Rightsidebar'
import Communityselector from './Communityselector'
import Popularaccounts from './Popularaccounts'

const Mobilemenu = ({setIsOpen}) => {
  return (
    <div
    className='bg-dark backdrop-blur-sm bg-opacity-50 absolute top-0 left-0 w-[100vw] h-[100vh] z-10 '
    onClick={() => setIsOpen(false) }
    >
        <div
        className='relative top-0 left-0 h-[100vh] bg-slate-100 w-[70%]'
        onClick={e => e.stopPropagation()}
        >
            <Menu />
            <Communityselector />
        </div>
    </div>
  )
}

export default Mobilemenu