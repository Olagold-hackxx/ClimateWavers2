import React from 'react'
import Postcomponent from './Postcomponent'


const Happeningnow = () => {
  return (
    <div className='text-2xl text-center pt-1 md:pt-5 '>
        <h2 className='border-b-2 pb-1 md:pb-3 text-lg md:text-xl font-semibold '>Happening Now</h2>
        <Postcomponent />
    </div>
  )
}

export default Happeningnow