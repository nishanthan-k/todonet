import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useLocalStorage from '../hooks/useLocalStorage';

export default function ProtectedRoute() {
  const ls = useLocalStorage();
  const token = ls.getItem('token');

  return token ? <Outlet /> : <Navigate to='/login' />
}
