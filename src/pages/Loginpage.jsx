import React, { useState } from "react";
import Signupform from "../components/Signupform";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Login from "../components/Login";

//const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
//const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

const Loginpage = () => {
  const oauthUrl = import.meta.env.VITE_APP_OAUTH_URL;

  return (
    <div className="grid md:grid-cols-[3fr_4fr] grid-cols-[1fr]  items-center ">
      <div className="bg-green grid place-content-center h-[80vh] md:h-[100vh]   ">
        <img src="../../logolargewhite.png" alt="" />
      </div>
      <div className="flex flex-col text-center items-center gap-4 -mt-[550px] md:mt-0 bg-opacity-40 backdrop-filter backdrop-blur-lg bg-white border md:border-0 border-gray-300  md:bg-inherit w-[90%] md:w-[100%] justify-self-center rounded-xl p-3 ">
        <>
          <h1 className="text-2xl font-semibold mb-3 mt-8 md:mt-0 ">Sign in</h1>
          <div className="flex flex-row mb-3 items-center md:text-xl text-base  font-semibold outline outline-1 bg-white text-black p-4 rounded-full ">
            <FcGoogle className="mr-2 " size={32} /> Continue in with Google
          </div>
          <div className="flex flex-row gap-3 w-[100%] justify-center bg-white py-3 ">
            <a href={`${oauthUrl}/api/v1/auth/github`}>
              <img className="w-[35px]" src="../../2.png" alt="" />
            </a>
            <a href={`${oauthUrl}/api/v1/auth/facebook`}>
              <img className="w-[35px]" src="../../3.png" alt="" />
            </a>
            <a href={`${oauthUrl}/api/v1/auth/redhat-sso`}>
              <img className="w-[35px]" src="../../4.png" alt="" />
            </a>
            <a href={`${oauthUrl}/api/v1/auth/linkedin`}>
              <img className="w-[35px]" src="../../5.png" alt="" />
            </a>
          </div>
          <p>or</p>
          <Login />
          <Link to={"/forgotpassword"}>
            <p className="text-lg font-semibold hover:cursor-pointer ">
              Forgot password?
            </p>
          </Link>
          <p>
            Don’t have an account?{" "}
            <Link to={"/signup"} className="underline text-green">
              Sign up
            </Link>{" "}
          </p>
        </>
      </div>
    </div>
  );
};

export default Loginpage;
