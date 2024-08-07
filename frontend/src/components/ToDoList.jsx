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

function ToDoList() {
  const [todos, setToDos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getToDos = async () => {
    try {
      const req = await axiosInstance.get(todo.getToDoApi);

      if (req.status >= 200 && req.status <= 300) {
        const { estatus, todos } = req.data;
        if (estatus) {
          setToDos(todos);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
        console.log('Error in fetching todos');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    getToDos();
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <section className="grid grid-cols-1 gap-2">
      {todos.length > 0 ? (
        todos.map((todo, i) => (
          <ToDoCard
            key={i}
            todo={todo}
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