import { useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import AddNewToDo from "./components/AddNewToDo";
import ToDoList from "./components/ToDoList";
import useGetLocalStorage from "./hooks/useGetLocalStorage";
import { toDoList } from "./store/atoms/todo.atom";

function App() {
  const setToDo = useSetRecoilState(toDoList);
  const lsArr = useGetLocalStorage('todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setToDo(lsArr);
    setLoading(false);
  }, [setToDo, lsArr]);

  return (
    <main className="w-screen h-dvh overflow-auto no-scrollbar bg-slate-800 flex justify-center py-10 px-10 mb:px-7">
      <section className="max-w-xl w-full flex flex-col gap-10">
        <AddNewToDo />
        <ToDoList loading={loading} />
      </section>
    </main>
  );
}

export default App;
