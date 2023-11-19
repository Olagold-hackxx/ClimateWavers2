import { useForm } from "react-hook-form";
//import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export default function Createcomment() {
  const { register, handleSubmit, reset } = useForm();

  //const formError = formState.errors;
  const postId = useParams().postId;
  const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
  const accessToken = Cookies.get("access_token");

  const onSubmit = (data) => {
    // Send data to API if needed
    const posterFn = async () => {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
        "X-CSRFToken": `${Cookies.get("csrftoken")}`,
      };
      data.picture = data.picture[0];
      await axios
        .post(`${backendUrl}/api/v1/backend/posts/${postId}/comment`, data, {
          headers,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);
          Cookies.set("access_token", response.data.access_token);
        })
        .catch((error) => console.log(error));
    };
    toast.promise(posterFn, {
      pending: "Submitting comment..",
      success: "Comment posted 👌",
      error: "An Error occured 🤯",
    });
    // Reset the form after submission
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" p-3 md:p-6 bg-white rounded-md shadow-md flex flex-col"
    >

      <textarea
        type="text"
        placeholder="Comment"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("comment", { required: true })}
      />
      <input
        type="file"
        className="w-full p-2 mb-3 border rounded focus:border-green focus:outline-none"
        {...register("picture", { required: false })}
      />
      <button
        className="w-full p-2 bg-green text-white rounded cursor-pointer z-10"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}


/*Createcomment.propTypes = {
	postId: PropTypes.string,
  };*/