import { useState } from "react";
import { BsBriefcase, BsPerson } from "react-icons/bs";
import { FiMapPin } from "react-icons/fi";
import Postcomponent from "./Postcomponent";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const [swittcher, setSwittcher] = useState(false);
  const [category, setCategory] = useState("");

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const userName = Cookies.get("username");
  const accessToken = Cookies.get("access_token");
  let pendingToastId;

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-CSRFToken": `${Cookies.get("csrftoken")}`,
  };



  //const editProfile = async () => {};
  const fetchProfile = async () => {
    const data = await axios
      .get(`${backendUrl}/api/v1/backend/${userName}/profile`, {
        headers: headers,
        withCredentials: true,
      })
      .then((res) => {
        Cookies.set("access_token", res.data.access_token);
        toast.dismiss(pendingToastId);
        toast.success("Profile data pulled successful", { autoClose: 1000 });
        return res.data;
      })
      .catch((err) => {
        console.log(err.message);
      });
    return data;
  };

  // Use the useQuery hook to execute the function and manage the query state
  const { data, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  if (isLoading) {
    pendingToastId = toast.info("Getting Profile details...", {
      autoClose: 2000,
    });
  }

  // Handle error state
  if (isError) {
    toast.error("Error fetching profile data", { autoClose: 1000 });
  }
  return (
    <div className="text-2xl text-center pt-1 md:pt-5 ">
      <h2 className="border-b-2 pb-1 md:pb-3 text-lg md:text-xl font-semibold flex flex-row items-center  ">
        <BsPerson className="ml-2 mr-1 " />
        Profile
      </h2>
      <div
        className={`h-[240px] relative bg-cover bg-center`}
        style={{ backgroundImage: `url(${
          data?.user_details?.cover
            ? `${backendUrl}/api/v1/backend${data.user_details.cover}`
            : "../../environ.jpeg"})`
        }}
      >
        <img
          src={
            data?.user_details?.profile_pic
              ? `${backendUrl}/api/v1/backend${data.user_details.profile_pic}`
              : "../../pic1.png"
          }
          className="absolute bottom-0 left-0 w-28 ml-2 mb-2 "
          alt=""
        />
      </div>
      <div>
        <div className="flex flex-row gap-2 ml-3 mt-3 ">
          {/* <h2 className='font-semibold text-xl '>{query.data.user_details.username}</h2> */}
          {/* <h2 className='font-semibold text-xl '>{sampleRequestData.user_details.name} </h2> */}
          <h2 className="font-semibold text-xl ">
            {data?.user_details?.username}
          </h2>
          {/* <h2 className=' text-lg '>{sampleRequestData.user_details.username}</h2> */}
          <h2 className=" text-lg ">{data?.user_details?.email}</h2>
        </div>
        <p className=" font-normal text-left ml-2 text-base my-2 ">
          {data?.user_details?.bio}
        </p>
        <div className="font-normal text-left text-gray-600 ml-2 text-base my-4 flex flex-row items-center gap-5   ">
          <p className="flex flex-row items-center gap-1 ">
            <FiMapPin size={17} />
            Nigeria
          </p>
          <p className="flex flex-row items-center gap-1">
            <BsBriefcase size={17} />
            Climate Analyst
          </p>
        </div>
      </div>
      {/* Post Swittcher */}
      <div>
        <div className="text-gray-400 flex flex-row justify-center text-base gap-8 border-0 border-b-2 ">
          <h2
            className={`cursor-pointer ${
              swittcher === false ? "text-black border-b-2 border-black" : null
            } `}
            onClick={() => {
              setSwittcher(!swittcher);
              setCategory("");
            }}
          >
            My posts
          </h2>
          <h2
            className={`cursor-pointer ${
              swittcher === true ? "text-black border-b-2 border-black" : null
            } `}
            onClick={() => {
              setSwittcher(!swittcher);
              setCategory("community");
            }}
          >
            Community
          </h2>
        </div>
        <Postcomponent category={category} />
      </div>
    </div>
  );
};

export default Profile;
