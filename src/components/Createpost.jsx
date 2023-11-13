// import React from 'react'

// const Createpost = () => {
//   return (
//     <div>
//         Createpost
//     </div>

//   )
// }

// export default Createpost

import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import Cookies from 'js-cookie';

export default function Createpost() {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState,
  } = useForm();

  const formError = formState.errors

  

  const onSubmit = (data) => {
    console.log(data);
    // Send data to API if needed
    const posterFn = async() => {
      await axios.post("https://backend-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/backend/register", data)
        .then((response) => {
          Cookies.set("token", response.data.token)
          Cookies.set("userId", response.data.id)
        })
        .then((error) => console.log(error))
    }
    toast.promise(
      posterFn,
      {
        pending: 'Singing Up...',
        success: 'Succesful 👌 Please confirm signup in your email',
        error: 'An Error occured 🤯'
      }
    )
    console.log(token)
    // Reset the form after submission
    reset({
      first_name: "",
      last_name: "",
      mobileNumber: "",
      password: "",
      username: "",
      email: "",
    });
  };

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)}
      className=" p-3 md:p-6 bg-white rounded-md shadow-md flex flex-col"
    >
      <input 
      type="text" 
      placeholder="Heading" 
      className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
      {...register("heading", {required: true})} />
      <textarea 
      type="text" 
      placeholder="Description" 
      className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
      {...register("description", {required: true})} />
      <input 
      type="file" 
      className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
      {...register("description", {required: true})} />
      <button 
        className="w-full p-2 bg-green text-white rounded cursor-pointer z-10"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
