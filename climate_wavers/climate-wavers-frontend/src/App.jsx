import './App.css'
import Education from './components/Education'
import Leftsidebar from './components/Leftsidebar'
import Mainfeed from './components/Mainfeed'
import Rightsidebar from './components/Rightsidebar'
import SharedLayout from './components/SharedLayout'
import Topbar from './components/Topbar'
import Menu from './components/menu'
import { Routes, Route, } from 'react-router-dom'

function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element= {<Mainfeed />} />
          <Route path='/education' element= {<Education />} />
        </Route>
      </Routes>
    </div>
    // <div>
    //   <Topbar/>
    //   <div className='grid grid-cols-[1fr_2fr_1fr] px-3 md:px-20 '>
    //     <Leftsidebar/>
    //     <Mainfeed/>
    //     <Rightsidebar />
    //   </div>
    // </div>
  )
}

export default App
