import React from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

export default function UserProfile() {
  const ls = useLocalStorage();
  const user = ls.getItem('user_id');
  const navigate = useNavigate();

  const authHandler = () => {
    if (user) {
      ls.removeItem('token');
      ls.removeItem('user_id');
      navigate('/login');
    }
  }
  
  return (
    <div className="self-end md:absolute md:top-4 md:right-10">
      <button className="bg-slate-300 px-2 py-1 rounded-md" onClick={authHandler}>
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}
