import './App.css'
import Education from './components/Education'
import Leftsidebar from './components/Leftsidebar'
import Mainfeed from './components/Mainfeed'
import Rightsidebar from './components/Rightsidebar'
import SharedLayout from './components/SharedLayout'
import Signuppage from './pages/Signuppage'
import Topbar from './components/Topbar'
import Menu from './components/Menu'
import { Routes, Route, } from 'react-router-dom'
import Loginpage from './pages/Loginpage'
import Forgotpasswordpage from './pages/Forgotpasswordpage'
import Happeningnow from './components/Happeningnow'
import Disaster from './components/Disaster'
import Aianalysis from './components/Aianalysis'
import Waverx from './pages/Waverx'
import Profile from './components/Profile'
import Emailconfirmation from './pages/Emailconfirmation'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Createpost from './components/Createpost'

function App() {


  return (
    <div>
    <ToastContainer />
      <Routes>
        <Route path='/' element={<SharedLayout />} >
          <Route index element= {<Mainfeed />} />
          <Route path='/education' element= {<Education />} />
          <Route path='/happeningnow' element= {<Happeningnow />} />
          <Route path='/disaster' element= {<Disaster />} />
          <Route path='/aianalysis' element= {<Aianalysis />} />
          <Route path='/profile' element= {<Profile />} />
          <Route path='/createpost' element= {<Createpost />} />
        </Route>
        <Route path='/waverx' element= {<Waverx />} />
        <Route path='/signup' element= {<Signuppage />} />
        <Route path='/emailconfirmation/:userToken' element= {<Emailconfirmation />} />
        <Route path='/login' element= {<Loginpage />} />
        <Route path='/forgotpassword' element= {<Forgotpasswordpage />} />
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
