import React from 'react'
import Accountcard from './Accountcard'

const Popularaccounts = () => {
  return (
    <div>
    <div className='flex flex-col gap-2 bg-graylight list-none py-4 m-4 rounded-2xl '>
        <h2 className='text-lg font-semibold p-3'>Popular accounts</h2>
        <Accountcard />
        <Accountcard />
        <Accountcard />
    </div>
    </div>
  )
}

export default Popularaccounts