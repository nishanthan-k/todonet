import React from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import axiosInstance from '../utils/api/axiosInstance';
import { auth } from '../utils/api/apiurls';
import { useNavigate } from 'react-router-dom';
import useSetLocalStorage from '../hooks/useSetLocalStorage';
import { LoginType } from '../global/types/auth/auth.types';
import { loginSchema } from '../utils/schema/authSchema';


export default function Login() {
  const setLS = useSetLocalStorage();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const submitHandler = async (data: LoginType) => {
    try {
      const req = await axiosInstance.post(auth.loginApi, data);

      if (req.status >= 200 && req.status <= 300) {
        const { token } = req.data;
        setLS('token', token);
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
          {errors && errors.email && <span className='m-0 text-red-500'>{errors.email.message}</span>}
          <input
            type="text"
            {...register("password", { required: "Password is required" })}
            className='rounded-sm hover:ring-sky-400 hover:ring-2 focus:rounded-md outline-none focus:ring-2 focus:ring-blue-400 px-2'
          />
          {errors && errors.password && <span className='m-0 text-red-500'>{errors.password.message}</span>}
          <button className='text-white max-w-1/2 w-full self-center rounded-md bg-slate-700 p-2 '>
            SUBMIT
          </button>
        </form>
    </div>
  )
}
