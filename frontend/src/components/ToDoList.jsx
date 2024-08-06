import PropTypes from 'prop-types';
import { useRecoilStateLoadable, useRecoilValue } from "recoil";
import useSetLocalStorage from "../hooks/useSetLocalStorage";
import { toDoList } from "../store/atoms/todo.atom";
import { sortedToDos } from "../store/selectors/todo.selector";
import ToDoCard from "./ToDoCard";
import Loader from "../global/loader/Loader";
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/api/axiosInstance';
import { todo } from '../utils/api/apiurls';

function ToDoList({ loading }) {
  const [toDosLoadable, setToDosTemp] = useRecoilStateLoadable(toDoList);
  const sortedToDo = useRecoilValue(sortedToDos);
  const setLS = useSetLocalStorage();
  const [todos, setToDos] = useState([]);

  // const handleDeleteTask = (id) => {
  //   const updatedToDos = toDosLoadable.contents.filter(
  //     (todo) => todo.id !== id
  //   );
  //   setToDos(updatedToDos);
  //   setLS("todos", updatedToDos);
  // };

  // const handleTaskCheck = (id) => {
  //   const updatedToDos = toDosLoadable.contents.map((todo) =>
  //     todo.id === id
  //       ? {
  //         ...todo,
  //         isCompleted: !todo.isCompleted,
  //         completedId: !todo.isCompleted
  //           ? toDosLoadable.contents.filter((n) => n?.completedId).length + 1
  //           : null,
  //       }
  //       : todo
  //   );

  //   setToDos(updatedToDos);
  //   setLS("todos", updatedToDos);
  // };

  const getToDos = async () => {
    try {
      const req = await axiosInstance.get(todo.getToDoApi);

      if (req.status >= 200 && req.status <= 300) {
        console.log('Todo fetched');
      } else {
        console.log('Error in fetching todos');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getToDos();
  }, [])

  return loading ? (
    <Loader />
  ) : (
    <section className="grid grid-cols-1 gap-2">
      {sortedToDo.length > 0 ? (
        sortedToDo.map((todo, i) => (
          <ToDoCard
            key={i}
            todo={todo}
            handleDeleteTask={handleDeleteTask}
            handleTaskCheck={handleTaskCheck}
          />
        ))
      ) : (
        <p className="text-white text-xl text-center">No todos found!</p>
      )}
    </section>
  );
}

export default ToDoList;

ToDoList.propTypes = {
  loading: PropTypes.bool.isRequired, 
}