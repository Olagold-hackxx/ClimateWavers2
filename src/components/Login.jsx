import { useForm } from 'react-hook-form';

export default function Login() {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors, isSubmitting }, 
    reset
  } = useForm();
  const onSubmit = (data) => {
    console.log(data)
    reset()
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
        {...register("username", {required: true, maxLength: 100})} />
        <input 
        type="password" 
        placeholder="Password*" 
        className="w-full p-2 mb-4 border rounded focus:border-green focus:outline-none"
        {...register("password", {required: true, maxLength: 20,})} />
        <input 
        className="w-full p-2 bg-green text-white rounded cursor-pointer"
        type="submit" />
    </form>
  );
}