import React from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../store/atoms/todo.atom";

export default function UserProfile() {
  const user = useRecoilValue(userAtom);
  
  return (
    <div className="self-end md:absolute md:top-4 md:right-10">
      <button className="bg-slate-300 px-2 py-1 rounded-md">
        {user ? 'Logout' : 'Login'}
      </button>
    </div>
  )
}
