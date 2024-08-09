import React from 'react';
import { useForm } from "react-hook-form";
import axiosInstance from '../utils/api/axiosInstance';
import { auth } from '../utils/api/apiurls';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { register, handleSubmit, formState } = form;
  // const { errors } = form;

  const submitHandler = async (data) => {
    try {
      const req = await axiosInstance.post(auth.loginApi, data);

      if (req.status >= 200 && req.status <= 300) {
        navigate('/');
      }
    } catch (error) {
      console.log('Error in login', error);
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
        <h2 className='text-3xl text-white font-medium'>Login</h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          className='min-w-80 max-w-md w-3/4 flex flex-col gap-6'
        >
          <input
            type="text"
            {...register("email", { required: "Email is required" })}
            className='rounded-sm hover:ring-sky-400 hover:ring-2 focus:rounded-md outline-none focus:ring-2 focus:ring-blue-400 px-2'
            autoFocus
          />
          <input
            type="text"
            {...register("password", { required: "Password is required" })}
            className='rounded-sm hover:ring-sky-400 hover:ring-2 focus:rounded-md outline-none focus:ring-2 focus:ring-blue-400 px-2'
          />
          <button className='text-white max-w-1/2 w-full self-center rounded-md bg-slate-700 p-2 '>
            SUBMIT
          </button>
        </form>
    </div>
  )
}
