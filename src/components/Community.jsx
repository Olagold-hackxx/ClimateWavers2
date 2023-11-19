import Postcomponent from './Postcomponent'


const Community = () => {
  return (
    <div className='text-2xl text-center pt-1 md:pt-5 '>
        <h2 className='border-b-2 pb-1 md:pb-3 text-lg md:text-xl font-semibold '>Community</h2>
        <Postcomponent category="community"/>
    </div>
  )
}

export default Community
