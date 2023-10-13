import './App.css'
import Leftsidebar from './components/Leftsidebar'
import Mainfeed from './components/Mainfeed'
import Rightsidebar from './components/Rightsidebar'
import Topbar from './components/Topbar'
import Menu from './components/menu'

function App() {


  return (
    <div>
      <Topbar/>
      <div className='grid grid-cols-[1fr_2fr_1fr] px-3 md:px-20 '>
        <Rightsidebar />
        <Mainfeed/>
        <Leftsidebar/>
      </div>
    </div>
  )
}

export default App
