import "./App.css";
import Education from "./components/Education";
import Mainfeed from "./components/Mainfeed";
import Community from "./components/Community";
import SharedLayout from "./components/SharedLayout";
import Signuppage from "./pages/Signuppage";
import { Routes, Route } from "react-router-dom";
import Loginpage from "./pages/Loginpage";
import Forgotpasswordpage from "./pages/Forgotpasswordpage";
import Happeningnow from "./components/Happeningnow";
import WaverX from "./components/WaverX";
import Waverx from "./pages/Waverx";
import Profile from "./components/Profile";
import Emailconfirmation from "./pages/Emailconfirmation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Createpost from "./components/Createpost";
import Comment from "./pages/Comment";
import Createcomment from "./components/Createcomment";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Mainfeed />} />
          <Route path="/community" element={<Community />} />
          <Route path="/education" element={<Education />} />
          <Route path="/happeningnow" element={<Happeningnow />} />
          <Route path="/waverx-tweet" element={<WaverX />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:postId/comments" element={<Comment />} />
          <Route path="/createpost" element={<Createpost />} />
          <Route path="/:postId/comment" element={<Createcomment />} />
        </Route>
        <Route path="/:userId/waverx" element={<Waverx />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route
          path="/emailconfirmation/:userToken"
          element={<Emailconfirmation />}
        />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/forgotpassword" element={<Forgotpasswordpage />} />
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
  );
}

export default App;
