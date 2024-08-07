import { useEffect, useRef, useState } from "react";
import { todo } from "../utils/api/apiurls";
import axiosInstance from "../utils/api/axiosInstance";
import { useRecoilState } from "recoil";
import { toDoList } from "../store/atoms/todo.atom";

function AddNewToDo() {
  const [newToDo, setNewToDo] = useState('');
  const [totalToDo, setTotalToDo] = useRecoilState(toDoList);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, [newToDo])

  const handleAddToDo = async () => {
    const currToDo = {
      todo_id: totalToDo[0].todo_id + 1,
      task: newToDo,
      isCompleted: false,
      isDeleted: false,
    }
    setTotalToDo((prev) => [currToDo, ...prev])
    setNewToDo('')
    try {
      const response = await axiosInstance.post(todo.addToDoApi, { task: newToDo });
      
      if (response.status >= 200 && response.status < 300) {
        console.log('Todo added successfully');
        // const { estatus, todo } = response.data;
        
        // if (estatus) {
        //   setWaitingForResp(false);
        //   // setTotalToDo((prev) => [todo[0], ...prev])
        // }
      } else {
        console.log('Error in adding todo');
      }
    } catch (error) {
      console.error('Error during API call:', error);
    }
  }

  return (
    <div className="w-full flex justify-between gap-4 h-fit">
      <input 
        type="text"
        alt="Create a to do..."
        ref={inputRef}
        className="w-11/12 h-10 rounded-sm hover:ring-slate-400 hover:ring-2 focus:rounded-md outline-none focus:ring-2 focus:ring-blue-400 px-2"
        value={newToDo}
        onChange={(e) => setNewToDo(e.target.value)}
      />
      <button
        className={`bg-blue-400 px-6 py-0.5 rounded-md ${!newToDo ? 'cursor-not-allowed bg-sky-900' : 'hover:bg-sky-600'}`}
        onClick={handleAddToDo}
        disabled={!newToDo}
      >
        Add
      </button>
    </div>
  )
}

export default AddNewToDo;
