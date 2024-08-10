import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import useLocalStorage from "./hooks/useLocalStorage";
import ProtectedRoute from "./routes/ProtectedRoute";
import Login from "./screens/Login";
import ToDoScreen from "./screens/ToDoScreen";
import { userAtom } from "./store/atoms/todo.atom";
import Signup from "./screens/Signup";

function App() {
  const setUser = useSetRecoilState(userAtom);
  const ls = useLocalStorage();

  useEffect(() => {
    const userLS = ls.getItem('user_id');
    
    if (userLS) {
      setUser(userLS);
    }
  }, [])

  return (
    <main className="w-screen h-dvh bg-slate-800">
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ToDoScreen />}/>
        </Route>

        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>
    </main>
  );
}

export default App;
