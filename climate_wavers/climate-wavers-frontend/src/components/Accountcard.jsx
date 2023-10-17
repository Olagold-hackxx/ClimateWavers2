import {useState} from 'react'

const Accountcard = () => {

    const [isFollow, setIsFollow] = useState(false)

  return (
    <div className='flex flex-row items-center px-3 py-1 justify-between '>
        <div className='flex flex-row items-center self-center '>
            {/* Img here */}
            <div className='min-w-[30%] w-[30%] '><img src='../../public/pic1.png' className='mr-2 w-[100%] '/></div>
            <div className='text-xs'>
                <h3>Titi Simon</h3>
                <p>@titisimon21</p>
            </div>
        </div>
        <button
        onClick={() => setIsFollow(!isFollow)}
        className={`bg-black text-xs text-white font-semibold py-2 px-3 ml-2  rounded-xl  ${isFollow && "bg-red-100 outline outline-3 outline-red-500 text-red-500 "} `}>
            {
                isFollow === true ? "Unfollow" : "Follow"
            }
        </button>
    </div>
  )
}

export default Accountcard