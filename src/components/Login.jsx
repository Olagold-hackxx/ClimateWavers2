import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    //formState: { errors, isSubmitting },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const onSubmit = (data) => {
    try {
      const pendingToastId = toast.info("Logging In...", { autoClose: false });
      const loginFn = async () => {
        await axios
          .post(`${backendUrl}/api/v1/backend/login`, data, {withCredentials: true})
          .then((response) => {
            toast.dismiss(pendingToastId);
			toast.success("Login successful");
			// Reset the form
            reset();

            // Use the cookies as needed
            Cookies.set("access_token", response.data.access_token);
            Cookies.set("refresh_token", response.data.refresh_token);
            Cookies.set("username", response.data.user_details.username);
            Cookies.set("user_id", response.data.user_details.id);

            navigate("/");
          })
          .catch((error) => {
            console.log(error);
			toast.dismiss(pendingToastId);
            toast.error(
              "Login failed. Please make sure the password is correct."
            );
          });
      };
      loginFn();
    } catch (error) {
      // Handle errors (display error toast, etc.)
      console.error("Login error:", error);
      toast.error("Login failed. Please make sure the password is correct.");
    }
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
        {...register("username")}
      />
      <input
        type="password"
        placeholder="Password*"
        className="w-full p-2 mb-4 border rounded focus:border-green focus:outline-none"
        {...register("password")}
      />
      <input
        className="w-full p-2 bg-green text-white rounded cursor-pointer"
        type="submit"
      />
    </form>
  );
}
