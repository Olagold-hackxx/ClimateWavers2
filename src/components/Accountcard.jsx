import { useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from "axios";
import PropTypes from "prop-types";


const Accountcard = ({ userId }) => {
  const [isFollow, setIsFollow] = useState(false);
  //const [followStyle, setFollowStyle] = useState('bg-black text-xs text-white font-semibold py-2 px-3 ml-2 rounded-xl')

  //const unfollowStyles = ' after:content-[Unfollow] after:bg-white-100 after:outline after:outline-3 after:outline-black-500 after:text-white-500 '

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };

  const follow = async () => {
    const pendingToastId = toast.info("Following a user...", {
      autoClose: 1000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/${userId}/follow`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Followed a user", { autoClose: 1000 });
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error following the user", { autoClose: 1000 });
      });
  };
  const unfollow = async () => {
    const pendingToastId = toast.info("Unfollowing a user...", {
      autoClose: 2000,
    });
    await axios
      .get(`${backendUrl}/api/v1/backend/${userId}/unfollow`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success(`Unfollowed a user`, { autoClose: 1000 });
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
        toast.error("Error unfollowing a user", { autoClose: 1000 });
      });
  };
  const handleFollow = async () => {
    if (!isFollow) {
      follow();
    } else {
      unfollow();
    }
  };
  return (
    <div className="flex flex-row items-center px-3 py-1 justify-between ">
      <div className="flex flex-row items-center self-center ">
        {/* Img here */}
        <div className="min-w-[30%] w-[30%] ">
          <img src="../../pic1.png" className="mr-2 w-[100%] " />
        </div>
        <div className="text-xs">
          <h3>Titi Simon</h3>
          <p>@titisimon21</p>
        </div>
      </div>
      <button
        onClick={() => {
          setIsFollow(!isFollow);
          handleFollow();
        }}
        // style={followStyle}
        className={`bg-black text-xs text-white font-semibold py-2 px-3 ml-2  rounded-xl ${
          isFollow &&
          "bg-stone-100 outline outline-3 outline-stone-900 !text-slate-700 before:hover:content-['']  hover:bg-green-100 hover:outline hover:outline-3 hover:outline-black-500 hover:text-black-500 "
        } `}
      >
        {isFollow === true ? "Following" : "Follow"}
      </button>
    </div>
  );
};

Accountcard.propTypes = {
	userId: PropTypes.string,
  };
export default Accountcard;
