import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios'
import Cookies from 'js-cookie';

export default function Login() {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting }, 
    reset
  } = useForm();

  const onSubmit = (data) => {
    const posterFn = async() => {
      await axios.post("https://backend-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/api/v1/backend/login", data)
        .then((response) => {
          console.log(response)
          Cookies.set("access_token", response.data.access_token)
          Cookies.set("refresh_token", response.data.refresh_token)
          Cookies.set("username", response.data.user_details.username)
        })
        .then((error) => console.log(error))
    }
    // posterFn()
    toast.promise(
      posterFn,
      {
        pending: "Logging In...",
        success: "Successful ",
        error: "Please make sure the password is correct"
      }
    )
    console.log(data)
    reset()
    reset({
      password: "",
      username: "",
    });
  };
//   console.log(errors);

  return (
    <form 
    onSubmit={handleSubmit(onSubmit)}
    className="max-w-md mx-auto w-[100%] p-3 md:p-6 bg-white rounded-md shadow-md flex flex-col "
    >
        <input 
        type="text" 
        placeholder="Username, email or phone" 
        className="w-full p-2 mb-4 border rounded focus:border-green focus:outline-none"
        {...register("username", )} />
        <input 
        type="password" 
        placeholder="Password*" 
        className="w-full p-2 mb-4 border rounded focus:border-green focus:outline-none"
        {...register("password", )} />
        <input 
        className="w-full p-2 bg-green text-white rounded cursor-pointer"
        type="submit" />
    </form>
  );
}