import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { Link, useNavigate } from 'react-router-dom';
import ButtonLoader from '../global/loader/button/ButtonLoader';
import { LoginType } from '../global/types/auth/auth.types';
import useSetLocalStorage from '../hooks/useSetLocalStorage';
import { auth } from '../utils/api/apiurls';
import axiosInstance from '../utils/api/axiosInstance';
import { loginSchema } from '../utils/schema/authSchema';
import { HiEye, HiEyeOff } from "react-icons/hi";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const setLS = useSetLocalStorage();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'user1@gmail.com',
      password: 'user1'
    }
  })
  const { register, handleSubmit, formState, setError } = form;
  const { errors } = formState;

  const submitHandler = async (data: LoginType) => {
    setLoading(true)
    try {
      const req = await axiosInstance.post(auth.signupApi, {email: data.email, password: data.password});

      if (req.status >= 200 && req.status <= 300) {
        const { estatus, message } = req.data;

        if (estatus) {
          const { token, user_id } = req.data;
          setLS('token', token);
          setLS('user_id', user_id);
          navigate('/');
          setLoading(false)
        } else {
          if (message.includes('password')) {
            setError('password', {
              type: 'manual',
              message: message
            })
          } else {
            setError('email', {
              type: 'manual',
              message: message
            })
          }
          setLoading(false)
        }
      }
    } catch (error) {
      console.log('Error in login', error);
      setLoading(false)
    }
  }

  return (
    <div className='w-full h-full flex flex-col justify-center items-center gap-8'>
        <h2 className='text-3xl text-white font-medium'>Join us!</h2>
        <form
          onSubmit={handleSubmit(submitHandler)}
          noValidate
          className='min-w-80 max-w-md w-3/4 flex flex-col gap-6'
        >
          <div className='flex flex-col gap-1'>
            <input
              type="text"
              {...register("email", { required: "Email is required" })}
              className='rounded-md hover:ring-sky-400 hover:ring-2 focus:rounded-lg outline-none focus:ring-2 focus:ring-blue-400 px-2'
              autoFocus
            />
            {errors && errors.email && <span className='m-0 text-red-500'>{errors.email.message}</span>}
          </div>

          <div className='flex flex-col gap-1 relative'>
            <input
              type={hidePassword ? 'password' : 'text'}
              {...register("password", { required: "Password is required" })}
              className='rounded-md hover:ring-sky-400 hover:ring-2 focus:rounded-lg outline-none focus:ring-2 focus:ring-blue-400 px-2'
            />
            <div
              className='absolute absoluteCenter text-lg cursor-pointer'
              onClick={() => setHidePassword(!hidePassword)}
            >
              {hidePassword ? <HiEyeOff /> : <HiEye />}
            </div>
            {errors && errors.password && <span className='m-0 text-red-500'>{errors.password.message}</span>}
          </div>

          <button
            disabled={loading}
            className={`text-white font-medium max-w-1/2 w-full min-h-10 self-center flex items-center justify-center gap-2 rounded-md bg-slate-700 p-2 ${loading && 'opacity-50 cursor-not-allowed'}`}
          >
            {
              loading ? (
                <ButtonLoader />
              ) : (
                <span>REGISTER</span>
              )
            }  
          </button>
          <p className='text-white text-center'>Already registered? <Link className='text-blue-400 ml-2' to="/login">Login</Link></p>
        </form>
    </div>
  )
}
