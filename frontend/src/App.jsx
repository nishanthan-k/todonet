import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import useGetLocalStorage from "./hooks/useGetLocalStorage";
import { userAtom } from "./store/atoms/todo.atom";
import { Routes, Route } from "react-router-dom";
import ToDoScreen from "./screens/ToDoScreen";
import Login from "./screens/Login";

function App() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const userLS = useGetLocalStorage('user_id');
    
    if (userLS) {
      setUser(userLS);
    }
  }, [])

  return (
    <main className="w-screen h-dvh bg-slate-800">
      <Routes>
        <Route path="/" Component={ToDoScreen}/>
        <Route path="/login" Component={Login}/>
      </Routes>
    </main>
  );
}

export default App;
