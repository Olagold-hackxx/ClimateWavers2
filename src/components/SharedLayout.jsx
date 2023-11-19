import Topbar from "./Topbar";
import Leftsidebar from "./Leftsidebar";
import Rightsidebar from "./Rightsidebar";
import { Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

const SharedLayout = () => {
  const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

  const tweetUrl = import.meta.env.VITE_APP_TWEET_GENERATOR_URL;

  useEffect(() => {
    // Function to fetch educational tweets from your endpoint
    const fetchTweets = async () => {
      try {
        const response = await axios.post(
          `${tweetUrl}/api/generate-educational-tweet`
        );
        console.log(response.data);
		toast.success("waverX just tweeted, check it out", { autoClose: 2500 })
      } catch (error) {
        toast.error(error, { autoClose: 1000 });
      }
    };

    // Initial fetch when the component mounts
    fetchTweets();

    // Set up interval to fetch tweets every hour (3600000 milliseconds)
    const intervalId = setInterval(fetchTweets, 3600000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [tweetUrl]); // Empty dependency array ensures this effect runs only once on mount

  const fetchOauthUser = async () => {
    await axios
      .get(`${oauthUrl}/api/v1/auth/user`, { withCredentials: true })
      .then((res) => {
        Cookies.set("access_token", res.data.accessToken);
        Cookies.set("refresh_token", res.data.refreshToken);
        Cookies.set("username", res.data.username);
        Cookies.set("user_id", res.data.id);
        return res.data;
      })
      .catch((err) => console.log(err));
  };

  if (!Cookies.get("username")) {
    fetchOauthUser();
  }
  return (
    <div>
      <div className=" block md:hidden ">
        <Topbar />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] px-3 md:px-20 ">
        <Leftsidebar />
        {/* <Mainfeed/> */}
        <Outlet />
        <Rightsidebar />
      </div>
    </div>
  );
};

export default SharedLayout;
