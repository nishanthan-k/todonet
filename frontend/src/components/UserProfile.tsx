import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/todo.atom";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const user = useRecoilValue(userAtom);
  const navigate = useNavigate();
  
  return (
    <div className="self-end md:absolute md:top-4 md:right-10">
      <button className="bg-slate-300 px-2 py-1 rounded-md" onClick={() => navigate('/login')}>
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}
